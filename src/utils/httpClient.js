import axios from "axios";
import UseToken from "../components/handleToken/UseToken";  
const baseApiUrl = "https://localhost:7275/odata";
const { getToken, setToken, removeToken } = UseToken();
console.log(`${getToken("accessToken")}`)

const httpClient = axios.create({
    baseURL: baseApiUrl,
});
// Add a request interceptor to add the token to the headers
httpClient.interceptors.request.use((config) => {
    const token = getToken("accessToken");
    config.headers["Content-Type"] = "application/json";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});

// Add a response interceptor to refresh the token if it's expired
httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getToken("refreshToken");
            const accessToken = getToken("accessToken");
            const { data } = await httpClient.post("/Accounts/refresh-token", {
                accessToken, 
                refreshToken,
            });
            console.log(data)
            removeToken();
            setToken(data.accessToken, "accessToken");
            setToken(data.refreshToken, "refreshToken");
            return httpClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

const get = (url, params) => httpClient.get(url, { params });

const post = (url, data) => httpClient.post(url, data);

const put = (url, data) => httpClient.put(url, data );
const patch = (url, data) => httpClient.patch(url, data );
const del = (url) => httpClient.delete(url);

export { get, post, put, del, patch, httpClient };

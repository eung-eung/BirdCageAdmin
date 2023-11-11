import { jwtDecode } from "jwt-decode";
export default function UseToken() {
    const getToken = (tokenType = "accessToken") => {
        if (tokenType === "accessToken" || tokenType === "refreshToken")
            return localStorage.getItem(tokenType);
        return null;
    };

    const getUserPhoneFromToken = () => {
        return jwtDecode(getToken())[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
    };
    const getRoleFromToken = () => {
        return jwtDecode(getToken())[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    };

    const setToken = (token, tokenType) => {
        if (tokenType === "accessToken" || tokenType === "refreshToken")
            localStorage.setItem(tokenType, token);
    };
    const removeToken = () => {
        // if (tokenType === "accessToken" || tokenType === "refreshToken")
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };
    const decodeJwt = (accessToken = null) => {
        if (!accessToken) accessToken = getToken("accessToken");
        const decoded = jwtDecode(accessToken);
        return decoded;
    };

    return {
        setToken,
        getToken,
        removeToken,
        decodeJwt,
        getUserPhoneFromToken,
        getRoleFromToken,
    };
}

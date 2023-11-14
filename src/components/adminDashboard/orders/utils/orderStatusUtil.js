import {put} from "../../../../utils/httpClient";

export const handleUpdateOrderStatus = (status, id) => {
    return put(`/Orders/${status}/${id}`);
}
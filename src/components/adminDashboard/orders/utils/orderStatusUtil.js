export const handleUpdateOrderStatus = (status, id) =>{
    return fetch("http://localhost:5000/api/v1/order/updateStatus/" + id, {
        method: "PATCH", 
        body: JSON.stringify({
            status: status
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
}
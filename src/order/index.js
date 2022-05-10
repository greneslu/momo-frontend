import { API } from "../config";

export const getOrders = () => {
    return fetch(`${API}/order`, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getMyOrders = (token) => {
    return fetch(`${API}/myorder`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getSellerOrders = (token) => {
    return fetch(`${API}/mycommodity_with_order`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getMyOrdersDetail = (token) => {
    return fetch(`${API}/myorderdetail`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const addOrder = (product, token) => {
    return fetch(`${API}/order`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })


}

export const checkOutOneTime = (product) => {
    return fetch(`${API}/checkOutOneTime`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.text()
        })
        .catch(err => {
            console.log(err)
        })
}

export const checkOutATM = (product) => {
    return fetch(`${API}/checkOutATM`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.text()
        })
        .catch(err => {
            console.log(err)
        })
}

export const changeStatus = (order, token) => {
    return fetch(`${API}/OrderStatus/${order.id}/${order.status}`, {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
// export const addProduct = (product, token) => {
//     // console.log(name, email, password)
//     return fetch(`${API}/product`, {
//         method: "POST",
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(product)
//     })
//         .then(response => {
//             return response.json()
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

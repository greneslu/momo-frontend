import obj from "./productsJson"
import { addProduct } from "./product"
import { isAuthenticated } from "./auth";

export const test = () => {
    const token = isAuthenticated() && isAuthenticated().accessToken
    obj.products.forEach(item => {
        addProduct(item, token)
    })
    alert("輸入完畢")
}


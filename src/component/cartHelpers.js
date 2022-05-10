export const addItem = (item) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        if (cart.find(product => product.id === item.id)) {
            const index = cart.indexOf(cart.find(product => product.id === item.id))
            const num = cart.find(product => product.id === item.id).num
            const total = parseInt(num) + parseInt(item.num)
            cart[index] = {
                ...cart.find(product => product.id === item.id),
                num: total
            }
        } else {
            cart.push(item)
        }
        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        // cart = Array.from(new Set(cart.map(p => p.product.id))).map(id => {
        //     return cart.find(p => p.product.id === id)
        // })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
}

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];
}

export const updateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if (product.id === productId) {
                cart.splice(i, 1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
}

export const emptyCart = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("cart");
    }
}
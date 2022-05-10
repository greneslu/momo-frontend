export const addFavor = (item) => {
    let favor = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('favor')) {
            favor = JSON.parse(localStorage.getItem('favor'))
        }
        if (favor.find(product => product.id === item.id)) {
            const index = favor.indexOf(favor.find(product => product.id === item.id))
            favor = favor.splice(0, index)
        } else {
            favor.push(item)
        }
        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the favor

        // favor = Array.from(new Set(favor.map(p => p.product.id))).map(id => {
        //     return favor.find(p => p.product.id === id)
        // })

        localStorage.setItem('favor', JSON.stringify(favor));
    }
}

export const getFavor = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('favor')) {
            return JSON.parse(localStorage.getItem('favor'))
        }
    }
    return [];
}
const products = [
    {
        id: 'redshoe',
        description: 'Red Shoe',
        price: 42.12,
    },
    {
        id: 'bluejean',
        description: 'Blue Jeans',
        price: 55.50,
    },
]

function getAllProducts() {
    return products
}

module.exports = {
    getAllProducts
}


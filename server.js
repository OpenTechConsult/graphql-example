const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const products = require('./products/products.model')
const orders = require('./orders/orders.model')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: {
        Query: {
            products: async (parent, args, context, info) => {
                console.log('Getting the products...')
                const product = await Promise(parent.products)
                return product
            },
            orders: (parent, args, context, info) => {
                console.log('Getting the orders...')
                return parent.orders
            }
        }
    }
})

const root = {
    products: products,
    orders: orders
}

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(3001, () => {
    console.log('Running GraphQL server...')
})
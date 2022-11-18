const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const products = require('./products/products.model')
const orders = require('./orders/orders.model')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))

const schema = makeExecutableSchema({
    typeDefs: typesArray
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
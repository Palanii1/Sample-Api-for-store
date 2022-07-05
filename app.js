//The complete app that connects all the individual parts to form the complete whole. Connects the Routes, Middlewares, Database and the Web Port where the data will be displayed on the Web.

//requiring our inbuilt dotenv and async error modules
require('dotenv').config()
require('express-async-errors')

// kickstart express
const express = require('express');
const app = express();

//requiring our DB connection and Routes
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// requiring custom middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// inbuilt middleware
app.use(express.json())

// routes

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

// using our products route
app.use('/api/v1/products', productsRouter)

// using custom middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware)

//Web port .. App will be displayed on The Stated Port OR Port 3000 if there is none
const port = process.env.PORT || 3000

// start function that kickstarts DB connection and Port display
const start = async () =>{
    try {
        // connect to our specific DB in the .env file
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    } catch (error) {
        
    }
}

// calling start
start()
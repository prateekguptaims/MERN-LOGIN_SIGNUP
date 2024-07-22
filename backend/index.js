const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const AuthRouter=require('./Routes/AuthRoutes')
const ProductRouter=require('./Routes/ProductRouter')

require('./Models/db')

app.get('/',(req,res) => {
    res.send('hello');
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)


app.use('/products',ProductRouter)

const PORT = process.env.port || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

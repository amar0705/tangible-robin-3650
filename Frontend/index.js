const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {productRouter} = require("./routes/product.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const cors = require('cors')
const app = express ()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to the Homepage")
})

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));
  app.use("/users", userRouter)
app.use(authenticate)
app.use("/products", productRouter)


app.listen(8080, async()=>{
    try{
        await connection
        console.log("Connected to the Database")
    }catch(err){
        console.log("Trouble connecting to the Database")
        console.log(err)
    }
    console.log("Listening to port 8080")
})


const express=require('express');
require('./component/configga');
const User=require('./component/userdata');
const Login=require('./component/login');
const Data=require('./component/data');
const cors=require('cors');
const stripe=require("stripe")("sk_test_51O4KVKSJSW3kw8aKDXqePkwXP3FeaqS1tt7ueOrvLD1zppxwTN3RereezFBMCEQ4aepmBOYxzUuduhL1VfAIEIuW00CF83HMb9");


const app=express()

app.use(cors());
app.use(express.json());
//signup api
app.post('/register',async(req,res)=>{
    let data=new User(req.body)
    let result=await data.save()

    console.log(result)
    res.json(result)
})
//login api
app.post('/login',async(req,res)=>{
   let data=await User.findOne(req.body).select('-password')
   if(data){
    res.send(data)
   }else{
    res.send({result:'no data found'})
   }
})
//poduct api create in post
app.post('/createapi',async(req,res)=>{
    let data=new Data(req.body)
    let result=await data.save()

    console.log(result)
    res.send(result)
})
//product api get
app.get('/fetchapi',async(req,res)=>{
    let data=await Data.find()

    console.log(data)
    res.send(data)
})

//payment api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
     
const lineItems=products.map((product)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:product.title
        },
        unit_amount:product.price * 100,
    },
    quantity:product.qnty
}));

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
     });

     res.json({id:session.id}) 
})

app.listen(3002,()=>{
    console.log('SERVER STARTED on this port no 3002')
})


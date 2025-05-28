const express=require("express")
const aiRoutes=require('./ai.router')
const cors=require('cors')
const app=express()
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // update with your actual frontend URL
  credentials: true
}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("API is running...")
 })

app.use('/ai',aiRoutes)

module.exports=app
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express();
app.use(express.json())
require("dotenv").config()

const workoutModel=require('./schema')

app.get("/",(req,res)=>{
    console.log("hii..")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    try {
        console.log("connected to mongodb")
    } catch (error) {
        console.log("error")
    }
})

app.post("/create",async(req,res)=>{
    try {
        const{user,date,duration,name}=req.body
        if(!name||!date ||!duration ||!user){
            res.status(400).json({"error":"Validation falied [field] is required"})
        }
      res.status(201).json("created")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
app.get("/user",async(req,res)=>{
    try {
        const user=workoutModel.find()
        res.status(200).json("Found all")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

app.get("/user/:id",async(req,res)=>{
    try {
        const id=req.params.id
        const user=workoutModel.findById(id)
        res.status(200).json("Found")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

app.put("/user/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const updated= workoutModel.findByIdAndUpdate(id,req.body,{new:true})
         if(!updated){
            res.status(404).json({"error":"Workout not found"})
         }
        res.status(200).json("Found")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

app.delete("/user/:",async(req,res)=>{
    try {
        const id=req.params.id
        const deleted= workoutModel.findByIdAndDelete(id)
        if(!deleted){
            res.status(404).json({"error":"Workout not found"})
        }
        res.status(200).json("Found")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

app.listen(process.env.port,()=>{
    try {
        console.log(`server is running on port http://localhost:${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})
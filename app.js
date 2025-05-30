import express from 'express';

const app = express();


app.get('/',(req,res)=>{
    res.send("Welcome to my subscription tracker app");
})

app.listen(3000,()=>{
    console.log("Subscription Tracker running on http://localhost:3000");
    
})

export default app;
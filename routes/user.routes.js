import { Router } from "express";
import User from '../models/user.model.js'
import { getUsers,getUser } from "../controllers/user.controller.js";
import { authorize }  from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get('/',getUsers);

userRouter.get('/:id',authorize,getUser);

userRouter.post('/',async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const a1 = await user.save()
        res.json(a1)
    }catch(err){
        res.send("Error:",err)
    }
});

userRouter.put('/:id',(req,res)=>res.send({title:"Update user"}));

userRouter.delete('/:id',(req,res)=>res.send({title:"Delete a user"}));

export default userRouter;
import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import swaggerDocs from './docs/swagger.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();
// Add this line to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter); // Assuming you have a workflow router
app.use(errorMiddleware);
app.use(arcjetMiddleware)

swaggerDocs(app);

app.get('/',(req,res)=>{
    res.send("Welcome to my subscription tracker app");
})

app.listen(PORT,async ()=>{
    console.log(`Subscription Tracker API running on http://localhost:${PORT}`);
    connectToDatabase();
})

export default app;
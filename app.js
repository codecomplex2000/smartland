import express from "express";
import { PORT } from "./config/env.js";
import usersRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDb from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express()
app.use(errorMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(arcjetMiddleware)
// process data sent via a html form in a simple format using express.urlencoded({extended:false})

app.use(express.urlencoded({extended:false}))

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);
app.get('/',(req,res)=>{
    res.send({body:'first link'})
})

app.listen(PORT, async()=>{
    console.log('Server running on port ' + PORT);
    await connectToDb()
})

export default app
import Subscription from '../models/subscription.model.js'
import workflowRouter from '../routes/workflow.routes.js';

export const createSubscription = async(req,res,next) =>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        });

        await workflowRouter.trigger(`Send reminders`);

        res.status(201).json({
            success:true,
            message:"Subscription created successfully",subscription});
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async(req,res,next) =>{
    try {
        // check if user is the same as the one in the token
       if(req.user.id !== req.params.id){
        const error = new Error('You are not the account owner')
        throw error
       }
       const subscriptions = await Subscription.find({user:req.params.id})

       res.status(200).json({
        success:true,
        message:"User subscriptions retrieved successfully",
        data:subscriptions
       })
        } catch (error) {
            next(error)
        }
}
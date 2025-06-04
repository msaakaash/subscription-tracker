import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
 
const REMINDERS = [7,5,2,1];

export const sendReminder = serve(async (context) => {
    const { subscriptionId } = context.params;
    const subscription = await fetchSubscripiton(context, subscriptionId);
    if(!subscription || subscription.status !== 'active') {
        const renewalDate = dayjs(subscription.renewalDate);
        if(renewalDate.isBefore(dayjs())) {
            console.log(`Subscription with ID ${subscriptionId} is not active or has already expired.`);
            return;
        }
        for(const daysBefore of REMINDERS){
            const reminderDate = renewalDate.subtract(daysBefore, 'day');
            if(reminderDate.isAfter(dayjs())) {
                await sleepUntilReminder(context,'Remainder ${daysBefore} days before renewal', reminderDate);
            }
            await triggerReminder(context, `Reminder ${daysBefore} days before renewal`);
        }
    }
})


const fetchSubscripiton = async (context, subscriptionId) => {
    return await context.run('get subscription',()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
};

const sleepUntilReminder = async (context, label,date) => {
    console.log(`Sleeping until ${label} at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async (context,label) => {
    return await context.run(label, async () => {
        console.log(`Triggering reminder for ${label} reminder`);
    
    })
}
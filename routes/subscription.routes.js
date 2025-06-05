import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import  { createSubscription, getUserSubscriptions, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription, cancelSubscription }  from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *               - startDate
 *             properties:
 *               plan:
 *                 type: string
 *                 example: "Premium"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-01"
 *               autoRenew:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Subscription created successfully
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6649b1fa8f1a0e9a6e4f1d12"
 *                     user:
 *                       type: string
 *                       example: "6649b1a8e8a2fa3c9f9a3a01"
 *                     plan:
 *                       type: string
 *                       example: "Premium"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-07-01"
 *                     autoRenew:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-01T10:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-01T10:00:00.000Z"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

subscriptionRouter.post('/',authorize,createSubscription);


/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all the subscriptions
 *     tags:
 *       - Subscriptions
 *     description: Retrieve a list of all subscriptions
 *     responses:
 *       200:
 *         description: A list of subscriptions
 */

subscriptionRouter.get('/',getAllSubscriptions);


/**
 * @swagger
 * /api/v1/subscriptions/{subscriptionId}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription to retrieve
 *     responses:
 *       200:
 *         description: Subscription fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6649b1fa8f1a0e9a6e4f1d12"
 *                     user:
 *                       type: string
 *                       example: "6649b1a8e8a2fa3c9f9a3a01"
 *                     plan:
 *                       type: string
 *                       example: "Premium"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-07-01"
 *                     autoRenew:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-01T10:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-01T10:00:00.000Z"
 *       401:
 *         description: Unauthorized – not allowed to view this subscription
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal Server Error
 */

subscriptionRouter.get('/:id',authorize,getSubscriptionById);



/**
 * @swagger
 * /api/v1/subscriptions/user/{id}:
 *   get:
 *     summary: Get all subscriptions for a specific user
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose subscriptions are to be retrieved
 *     responses:
 *       200:
 *         description: List of user subscriptions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6649b1fa8f1a0e9a6e4f1d12"
 *                       user:
 *                         type: string
 *                         example: "6649b1a8e8a2fa3c9f9a3a01"
 *                       plan:
 *                         type: string
 *                         example: "Premium"
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-06-01"
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-07-01"
 *                       autoRenew:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T10:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T10:00:00.000Z"
 *       401:
 *         description: Unauthorized – Not allowed to view this user's subscriptions
 *       404:
 *         description: User not found or no subscriptions
 *       500:
 *         description: Internal Server Error
 */

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     description: Updates a subscription by its ID. Requires authentication.
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: string
 *               status:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     plan:
 *                       type: string
 *                     status:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     user:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 */

subscriptionRouter.put('/:id',authorize,updateSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     description: Deletes a subscription by its ID. Requires authentication.
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to delete
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 */

subscriptionRouter.delete('/:id',authorize,deleteSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/{id}/cancel:
 *   post:
 *     summary: Cancel a subscription
 *     description: Cancels an active subscription by setting its `isActive` flag to false. Only the subscription owner can cancel.
 *     tags:
 *       - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to cancel
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     user:
 *                       type: string
 *                     plan:
 *                       type: string
 *                     status:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *       401:
 *         description: Unauthorized (not the subscription owner)
 *       404:
 *         description: Subscription not found
 */

subscriptionRouter.put('/:id/cancel',authorize,cancelSubscription);


subscriptionRouter.get('upcoming-renewals',(req,res)=>res.send({title:"Get upcoming renewals"}));


export default subscriptionRouter;
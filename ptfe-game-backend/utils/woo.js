/* global process */
/* eslint-disable no-unused-vars */

const axios = require("axios");

const getSubscriptionStatus = async (uid) => {  
  try {  
    const response = await axios.get(  
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/wc/v3/subscriptions?customer=${uid}&status=active`,  
      {  
        auth: {  
          username: process.env.WOOCOMMERCE_CONSUMER_KEY,  
          password: process.env.WOOCOMMERCE_CONSUMER_SECRET,  
        },  
      }  
    );  

    let isPT = false;  
    let isPTA = false; 
    let isExpired = false; 

    const productIdsSet = new Set([process.env.PT_SUBSCRIPTION_ID, process.env.PTA_SUBSCRIPTION_ID]);
    const currentDateTime = new Date().toISOString(); 
    response.data.forEach(subscription => {  
      for (const item of subscription.line_items) {  
        const productId = item.product_id.toString();  
        if (productIdsSet.has(productId)) {
          if (productId === process.env.PT_SUBSCRIPTION_ID) isPT = true;  
          if (productId === process.env.PTA_SUBSCRIPTION_ID) isPTA = true;  
        }
        // Early exit if both flags are true
        if (isPT && isPTA) return;  
      }  
      if (subscription.next_payment_date_gmt && subscription.next_payment_date_gmt < currentDateTime) {  
        isExpired = true;  
      } else if (subscription.trial_end_date_gmt && subscription.trial_end_date_gmt < currentDateTime && !subscription.last_payment_date_gmt) {  
        isExpired = true;  
      }  
    });  

    return { isPT, isPTA, isExpired };  
  } catch (error) {  
    console.error("Error fetching subscription status for UID:", uid, error.message);  
    throw new Error("Failed to get subscription status");  
  }  
};
module.exports = {
  getSubscriptionStatus,
};

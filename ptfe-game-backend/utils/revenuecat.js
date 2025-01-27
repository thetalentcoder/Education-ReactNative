const axios = require("axios");

const API_KEY = 'appl_zWmzPCmLrHPuQLIrRtiLxFQkdVi';
const productIds = [
    "pta_annual",
    "pta_monthly",
    "pt_annual",
    "pt_monthly"
];

const fetchUserSubscriptionData = async (uid) => {  
    try {  
        let isPT = false;  
        let isPTA = false; 
        let isExpired = false; 
        if (uid == -1) {
            return { isPT, isPTA, isExpired };
        }
        const response = await axios.get(`https://api.revenuecat.com/v1/subscribers/${uid}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        console.log("this is revenuecat API fetch API", response);
        const subscriber = response.data?.subscriber;
        if (!subscriber?.subscriptions || !subscriber?.entitlements) {
            return { isPT, isPTA, isExpired };
        }
        const { entitlements, subscriptions } = response.data.subscriber;
        const entitlementKey = Object.keys(entitlements)[0]; // Assuming single entitlement
        const entitlement = entitlements[entitlementKey];
        const productId = entitlement?.product_identifier?.toString();
        const isEntitlementActive = new Date(entitlement?.expires_date) > new Date();
        const subscriptionKey = productId; // Subscription key matches product ID
        const subscription = subscriptions[subscriptionKey];
        const isSubscriptionActive = new Date(subscription?.expires_date) > new Date();
        const isTrial = subscription?.is_trial_period === true;
        if (productId === "pta_annual" || productId === "pta_monthly") {
            isPTA = true;
        }
        if (productId === "pt_annual" || productId === "pt_monthly") {
            isPT = true;
        }
        if (!isSubscriptionActive && !isTrial) {
            isExpired = true;
        }

        return { isPT, isPTA, isExpired };  
    } catch (error) {  
        console.error("Error fetching subscription status for UID:", uid, error.message);  
        throw new Error("Failed to get subscription status");  
    }  
};

module.exports = {
    fetchUserSubscriptionData,
};




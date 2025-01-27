
function calculateDayDifference (date1, date2) {
  // Calculate time difference in milliseconds
  const timeDifference = Math.abs(date2 - date1);

  // Convert to days
  const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

  return daysDifference;
}

const calculateSubscriptionExpiryDate = (planDuration) => {
  const subscriptionExpiryDate = new Date();
  subscriptionExpiryDate.setMonth(subscriptionExpiryDate.getMonth() + planDuration);
  const formattedDate = subscriptionExpiryDate.toISOString().slice(0, 10);
  return formattedDate;
};

function getEstTime() {
  const utcNow = Date.now();
  const estOffset = -5 * 60 * 60 * 1000;
  const estNow = new Date(utcNow + estOffset);

  return estNow;
}

module.exports = {
  calculateDayDifference,
  calculateSubscriptionExpiryDate,
  getEstTime
}
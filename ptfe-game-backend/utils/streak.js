const updateStreakAndMilestones = async (user) => {
  try {
    const utcNow = Date.now();
    const estOffset = -5 * 60 * 60 * 1000;
    const estNow = new Date(utcNow + estOffset);

    const userDate = new Date(estNow);
    userDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(userDate);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastStreak = user.streakhistory[user.streakhistory.length - 1];
    const lastStreakDate = lastStreak ? new Date(lastStreak.date) : null;

    if (!lastStreakDate || !isSameDay(lastStreakDate, userDate)) {
      if (lastStreakDate && isSameDay(lastStreakDate, yesterday)) {
        user.streak += 1;
      } else {
        user.streak = 1;
        user.milestones = [];
        user.currentMultiplier = 1;
      }
      user.streakhistory.push({ date: estNow });

      const milestoneDays = [7, 14, 28, 56, 112, 224];

      user.milestones = milestoneDays.map((days, index) => {
        const multiplier = 1 + (index + 1) * 0.5;
        const date = new Date(userDate);
        date.setDate(date.getDate() + (days - user.streak));
        return {
          days,
          multiplier,
          date: new Date(date.getTime() + estOffset),
          achieved: user.streak >= days,
        };
      });

      const achievedMilestones = user.milestones.filter((m) => m.achieved);
      if (achievedMilestones.length > 0) {
        user.currentMultiplier =
          achievedMilestones[achievedMilestones.length - 1].multiplier;
      }
    }

    return user;
  } catch (error) {
    console.error("Error in updateStreakAndMilestones:", error);
    throw new Error("Failed to update streak and milestones");
  }
};

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

module.exports = {
  updateStreakAndMilestones,
  isSameDay,
};

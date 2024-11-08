// NotificationHandler.tsx
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

interface NotificationHandlerProps {
  streaks: number;
  scheduleForTomorrow: boolean; // New prop to determine notification schedule
  message: string;
}

const NotificationHandler: React.FC<NotificationHandlerProps> = ({ streaks, scheduleForTomorrow, message }) => {
  useEffect(() => {
    if (streaks > 0) {
      scheduleNotification(streaks, scheduleForTomorrow);
    }
  }, [streaks, scheduleForTomorrow]);

  const scheduleNotification = async (streaks: number, isTomorrow: boolean) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permissions are required to send notifications.');
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    const triggerDate = new Date();
    triggerDate.setHours(10); // 4 PM
    triggerDate.setMinutes(10);
    triggerDate.setSeconds(0);
    triggerDate.setMilliseconds(0);

    if (isTomorrow) {
      triggerDate.setDate(triggerDate.getDate() + 1); // Schedule for tomorrow
    } else if (triggerDate < new Date()) {
      // If scheduling for today but the time has already passed, schedule for tomorrow
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Streak Reminder!',
        body: `${message}`,
        sound: 'default',
      },
      trigger: {
        date: triggerDate,
      },
    });
  };

  return null; // No UI needed
};

export default NotificationHandler;

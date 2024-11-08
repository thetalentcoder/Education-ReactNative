import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function scheduleDailyNotification() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Notification permissions are required to receive daily reminders.');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Good Morning!',
      body: 'This is your daily reminder!',
      sound: "default",
    },
    trigger: {
      hour: 7,
      minute: 0,
      repeats: true,
    },
  });
}

const NotificationHandler = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('daily-reminder', {
        name: 'Daily Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }

    scheduleDailyNotification();
  }, []);

  return null; // This component does not need to render anything
};

export default NotificationHandler;

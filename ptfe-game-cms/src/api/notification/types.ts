export interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: Date;
}

export interface NotificationResponse {
  result: Notification[];
  total: number;
}

export interface NotificationRequest {
  title: string;
  message: string;
}

export interface PostNotificationRequest {
  id: string;
  title: string;
  message: string;
}

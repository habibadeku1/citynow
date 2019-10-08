import fetch from 'node-fetch';

export interface FcmNotification {
  title: string;
  text: string;
  tag: string;
}

export class FcmService {
  private key: string = "AIzaSyACtAmjOxszq7wtPVnmB3Ggfn8QCRlWkYs";


  sendNotification(notification: FcmNotification, destination: string) {

    const bd = notification.text.slice(0,120) + "..";

    const tg = notification.tag;
    
    const body = {
      notification:{
        "title": notification.title,
        "body": bd,
        "icon":"fcmpushicon",        
        "sound":"default",
        "color": "#0000",
        "click_action":"FCM_PLUGIN_ACTIVITY",        
        "tag": tg
      },
      ////notification: notification,
      to: destination
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${this.key}`
      },

    };

    return fetch("https://fcm.googleapis.com/fcm/send", options);
  }
}

export const fcmService = new FcmService();

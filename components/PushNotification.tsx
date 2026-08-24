"use client";

import { useEffect, useRef } from "react";

export default function PushNotification() {
  const initialized = useRef(false);

  useEffect(() => {
    const initOneSignal = async () => {
      if (initialized.current) return;
      initialized.current = true;

      // OneSignal sadece production ortamında çalışsın
      if (process.env.NODE_ENV !== "production") {
        return;
      }

      try {
        const OneSignal = (await import('react-onesignal')).default;

        await OneSignal.init({
          appId: "0e773e33-6a8a-47d7-8b56-4c02945ff065",
          notifyButton: {
            enable: true,
            prenotify: true,
            showCredit: false,
            text: {
              'tip.state.unsubscribed': 'Subscribe to notifications',
              'tip.state.subscribed': 'You are subscribed',
              'tip.state.blocked': 'Notifications are blocked',
              'message.prenotify': 'Click to subscribe',
              'message.action.subscribed': 'Thanks for subscribing!',
              'message.action.subscribing': 'Subscribing...',
              'message.action.resubscribed': 'You are subscribed',
              'message.action.unsubscribed': 'You will not receive notifications',
              'dialog.main.title': 'Manage Notifications',
              'dialog.main.button.subscribe': 'SUBSCRIBE',
              'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
              'dialog.blocked.title': 'Unblock Notifications',
              'dialog.blocked.message': 'Follow these instructions to allow notifications:',
            },
          },
        });

        OneSignal.Slidedown.promptPush();
      } catch (e: any) {
        // Bilinen hataları sessizce yoksay
        if (
          e?.message?.includes("already initialized") ||
          e?.message?.includes("App not configured for web push")
        ) {
          return;
        }
        // Beklenmeyen hataları sadece warn olarak logla
        console.warn("OneSignal init warning:", e?.message || e);
      }
    };

    if (typeof window !== "undefined") {
      initOneSignal();
    }
  }, []);

  return null;
}

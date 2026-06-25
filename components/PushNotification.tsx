"use client";

import { useEffect, useRef } from "react";
import OneSignal from 'react-onesignal';

export default function PushNotification() {
  const initialized = useRef(false);

  useEffect(() => {
    const initOneSignal = async () => {
      if (initialized.current) return;
      initialized.current = true;
      
      try {
        await OneSignal.init({
          appId: "0e773e33-6a8a-47d7-8b56-4c02945ff065",
          allowLocalhostAsSecureOrigin: true, // Localhost'ta test edebilmek için
          notifyButton: {
            enable: true, // Sağ altta küçük bir zil ikonu çıkarır (isteğe bağlı kapatılabilir)
            colors: {
              'circle.background': 'rgb(79, 70, 229)', // Indigo 600
              'circle.foreground': 'white',
              'badge.background': 'rgb(79, 70, 229)',
              'badge.foreground': 'white',
              'badge.bordercolor': 'white',
              'pulse.color': 'white',
              'dialog.button.background.hovering': 'rgb(67, 56, 202)', // Indigo 700
              'dialog.button.background.active': 'rgb(67, 56, 202)',
              'dialog.button.background': 'rgb(79, 70, 229)',
              'dialog.button.foreground': 'white',
            }
          },
        });
        
        // Kullanıcıya otomatik olarak bildirim izni sor
        OneSignal.Slidedown.promptPush();
      } catch (e) {
        console.error("OneSignal init error:", e);
      }
    };

    if (typeof window !== "undefined") {
      initOneSignal();
    }
  }, []);

  return null;
}

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
            enable: true,
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

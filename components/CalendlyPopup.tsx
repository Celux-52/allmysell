"use client";

import { useEffect, useState } from "react";
import { PopupWidget } from "react-calendly";

export default function CalendlyPopup({ lang }: { lang: string }) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Wait for the component to mount to safely access document
    setRootElement(document.body);
  }, []);

  if (!rootElement) return null;

  const isTr = lang === "tr";
  const text = isTr ? "Ücretsiz Danışmanlık Al" : "Book a Free Consultation";

  return (
    <PopupWidget
      url="https://calendly.com/allmysell/30min"
      rootElement={rootElement}
      text={text}
      textColor="#ffffff"
      color="#0A192F"
    />
  );
}

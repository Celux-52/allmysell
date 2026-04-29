'use client';

import { useEffect } from 'react';

export default function N8nChatWidget() {
  useEffect(() => {
    // Add CSS
    if (!document.querySelector('#n8n-chat-css')) {
      const link = document.createElement('link');
      link.id = 'n8n-chat-css';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Add Script
    if (!document.querySelector('#n8n-chat-script')) {
      const script = document.createElement('script');
      script.id = 'n8n-chat-script';
      script.type = 'module';
      script.innerHTML = `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        
        createChat({
          webhookUrl: 'https://n8n.allmysell.com/webhook/a12d9f09-3252-4d0f-b8ab-37950eb3fab3',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          metadata: {
            title: 'AllMySell AI Assistant',
            description: 'Ask me anything about our products!'
          }
        });
      `;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}

'use client';

import Image from 'next/image';
import {Inter} from 'next/font/google';
import HelloComponent from '@/components/HelloComponents';

import {RequestDetails} from 'deep-chat/dist/types/interceptors';
import {DeepChat as DeepChatCore} from 'deep-chat';
import styles from '../styles/Index.module.css';
import dynamic from 'next/dynamic';
import React, {useState} from 'react';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  // Need to import the component dynamically as it uses the 'window' property.
  // If you have found a better way of adding the component in next, please create a new issue ticket so we can update the example!
  const DeepChat = dynamic(() => import('deep-chat-react').then((mod) => mod.DeepChat), {
    ssr: false,
  }) as React.ComponentType<Partial<DeepChatCore>>;
  const [showChat, setShowChat] = useState(false);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <h1>Welcome to the Home Page</h1>
      <HelloComponent />
      <button
        onClick={() => {
          setShowChat((prev) => !prev);
        }}
      >
        toggle chat
      </button>

      {showChat && (
        <div>
          <h1>connect custom api</h1>
          <DeepChat
            chatStyle={{borderRadius: '10px'}}
            introMessage={{text: 'Send a chat message to an example server.'}}
            request={{url: '/api/custom/chat'}}
            requestBodyLimits={{maxMessages: -1}}
            requestInterceptor={(details: RequestDetails) => {
              console.log(details);
              return details;
            }}
            responseInterceptor={(response: any) => {
              console.log(response);
              return response;
            }}
          />
          <DeepChat
            chatStyle={{borderRadius: '10px'}}
            introMessage={{text: 'Send a streamed chat message to an example server.'}}
            request={{url: '/api/custom/chat-stream'}}
            stream={true}
          />
        </div>
      )}
    </main>
  );
}

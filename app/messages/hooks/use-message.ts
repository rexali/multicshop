'use client'

import { BASE_URL, SERVER_URL } from '../../../constants/url';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useMessage = (messageId: any) => {

  const [message, setMessage] = React.useState<any>({});

  useEffect(() => {

    const getMessageData = async () => {

      try {
        let { data: { data: { message } } } = await axios.get(`${SERVER_URL}/messages/${messageId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        setMessage(message);

      } catch (error) {
        console.warn(error);
      }

    };

    getMessageData();

  }, [messageId]);

  return { message };
};

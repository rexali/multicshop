'use client'

import { BASE_URL, SERVER_URL } from '../../../constants/url';
import { getMessages } from '../../../store/actions/app-actions';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useUserMessages = (userId: string, dispatch: any, pageNumber?: number,subdomain: string = 'maindomain') => {

  const [messages, setMessages] = React.useState<any>([]);

  useEffect(() => {

    const getMessageData = async () => {

      try {
        let { data: { data: { messages } } } = await axios.get(`${SERVER_URL}/messages/pages/${pageNumber}/users/${userId}/subdomains/${subdomain}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        dispatch(getMessages(messages))
        setMessages(messages);

      } catch (error) {
        console.warn(error);
      }

    };

    getMessageData();

  }, [dispatch, userId, pageNumber]);

  return { messages };
};

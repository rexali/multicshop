'use client'

import { SERVER_URL } from '../../../constants/url';
import { getMessages } from '../../../store/actions/app-actions';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useMessages = (dispatch: any, pageNumber: any = 1) => {

  const [messages, setMessages] = React.useState<any>([]);

  useEffect(() => {

    const getMessageData = async () => {

      try {
        let { data: { data: { messages } } } = await axios.get(`${SERVER_URL}/messages?page=${pageNumber}`, {
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

  }, [dispatch, pageNumber]);

  return { messages };
};

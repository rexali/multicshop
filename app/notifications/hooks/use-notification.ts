'use client'

import { BASE_URL, SERVER_URL } from '../../../constants/url';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useNotification = (notificationId:any) => {

  const [notification, setNotification] = React.useState<any>({});

  useEffect(() => {

    const getNotificationData = async () => {

      try {
        let { data:{data:{notification}} } = await axios.get(`${SERVER_URL}/notifications/${notificationId}`, {
          headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
          }
        });

        setNotification(notification);

      } catch (error) {
        console.warn(error);
      }

    };

    getNotificationData();

  }, [notificationId]);

  return {notification};
};

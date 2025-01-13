'use client'

import { BASE_URL, SERVER_URL } from '../../../constants/url';
import { getNotifications } from '../../../store/actions/app-actions';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useNotifications = (dispatch: any, pageNumber?: any,subdomain: string = 'maindomain') => {

  const [result, setResult] = React.useState<any>([]);

  useEffect(() => {

    const getNotificationData = async () => {

      try {
        let { data: { data: { notifications } } } = await axios.get(`${SERVER_URL}/notifications?page=${pageNumber}&subdomain=${subdomain}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        dispatch(getNotifications(notifications));
        setResult(notifications);
      } catch (error) {
        console.warn(error);
      }

    };

    getNotificationData();

  }, [dispatch, pageNumber]);

  return result;
};

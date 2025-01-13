'use client'

import { SERVER_URL } from '../../../constants/url';
import { getCarts } from '../../../store/actions/app-actions';
import axios from 'axios';
import React, { useEffect } from 'react';

export const useUserCarts = (userId: string, dispatch: any, pageNumber: number, subdomain: string = 'maindomain') => {

  const [carts, setCarts] = React.useState<any>([]);

  useEffect(() => {

    const getCartData = async () => {

      try {
        let { data } = await axios.get(`${SERVER_URL}/carts/pages/${pageNumber}/users/${userId}/subdomains/${subdomain}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        if (data.data === null) {
          return [];
        }

        if (!data.data.carts?.length) {
          return [];
        }

        let newcarts = data.data?.carts.map((cart: any) => {
          return {
            ...cart,
            product: {
              ...cart.product,
              cartId: cart._id,
              cartQuantity: cart.quantity,
              totalCarts: cart.totalCarts
            }
          }
        });

        const productsInCarts = newcarts.map((cart: any) => cart.product);
        dispatch(getCarts(productsInCarts));
        setCarts(productsInCarts);

      } catch (error) {
        console.warn(error);
      }
    };

    getCartData();

  }, [dispatch, userId, pageNumber]);

  return { carts };
};

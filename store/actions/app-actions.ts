
export const ActionTypes = {
  GET_CARTS: 'GET_CARTS',
  POST_CART: 'POST_CART',
  GET_PRODUCTS: 'GET_PRODUCTS',
  POST_PRODUCT: "POST_PRODUCT",
  GET_MESSAGES: 'GET_MESSAGES',
  GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
  GET_FAVOURITES: "GET_FAVOURITES",
  POST_FAVOURITE: "POST_FAVOURITE"
};

export const getCarts = (cartsData: any) => ({ 
  type: ActionTypes.GET_CARTS,
  payload: cartsData,
});

export const postCart = (cartData: any) => ({
  type: ActionTypes.POST_PRODUCT,
  payload: cartData,
});


export const getFavourites = (favouriteData: any) => ({
  type: ActionTypes.GET_FAVOURITES,
  payload: favouriteData,
});

export const postFavourite = (favouriteData: any) => ({
  type: ActionTypes.POST_FAVOURITE,
  payload: favouriteData,
});

export const getProducts = (productData: any) => ({
  type: ActionTypes.GET_PRODUCTS,
  payload: productData,
});

export const postProduct = (productData: any) => ({
  type: ActionTypes.POST_PRODUCT,
  payload: productData,
});


export const getMessages = (messagesData: any) => ({
  type: ActionTypes.GET_MESSAGES,
  payload: messagesData,
});


export const getNotifications = (notificationsData: any) => ({
  type: ActionTypes.GET_NOTIFICATIONS,
  payload: notificationsData,
});

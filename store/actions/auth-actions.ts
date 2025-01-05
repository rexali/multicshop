
export const ActionTypes = {
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  RESTORE_TOKEN: 'RESTORE_TOKEN'
};

export const signIn = (payload: any) => ({
  type: ActionTypes.SIGN_IN,
  payload: payload,
});

export const signUp = (payload: any) => ({
  type: ActionTypes.SIGN_OUT,
  payload: payload,
});

export const signOut = (payload: any) => ({
  type: ActionTypes.SIGN_OUT,
  payload: payload,
});

export const restoreToken = (payload: any) => ({
  type: ActionTypes.RESTORE_TOKEN,
  payload: payload,
});

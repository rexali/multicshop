'use client'

import * as React from 'react';
import reducer from '../store/reducers/app_reducer';

const initialState = {
    products: [],
    carts: [],
    messages: [],
    favourites: [],
    notifications: [],
    result: {},
};

const AppContext = React.createContext<any>(null);

const AppProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };

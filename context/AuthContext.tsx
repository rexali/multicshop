"use client"

import * as React from 'react';

import reducer from '../store/reducers/auth-reducer';

export const AuthContext = React.createContext<any>({});


const initialState = {
    isLoading: true,
    isSignout: false,
    user: {
        token: "",
        email: "",
        _id: "",
        role: "user",
        photo: "",
        lastName:""
    },
};

export default function AuthProvider(props: any) {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}


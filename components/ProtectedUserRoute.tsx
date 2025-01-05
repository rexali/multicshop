"use client"

import SignIn from "../app/auth/signin/page";
import { useAuth } from "../hooks/use-auth";

const ProtectedUserRoute = ({ children }: { children: any }) => {

    const { user: { _id, role, token } } = useAuth();

    if (role === 'user' && token && _id !== null || '') {

        return children
    }

    return <SignIn />;

}

export default ProtectedUserRoute


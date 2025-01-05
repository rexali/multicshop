"use client"

import SignIn from "../app/auth/signin/page";
import { useAuth } from "../hooks/use-auth";

const ProtectedAdminRoute = ({ children }: { children: any }) => {

    const { user: { _id, role, token } } = useAuth();

    if (role === 'admin' && token && _id !== null || '') {

        return children
    }

    return <SignIn />;

}

export default ProtectedAdminRoute


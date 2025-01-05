'use client'

/**
 * Sign out a user
 */
export function handleSignOut(router?:any) {
    try {
        // checked if the window exists
        if (typeof window !== "undefined") {
            // set the token null
            window.localStorage.setItem("token", "");
            window.localStorage.setItem("_id", "");
            window.localStorage.setItem("email", "");
            window.localStorage.clear();
            // navigate to log in page
            window.location.assign("/auth/signin");
            // router.push("/auth/signin")
        }
    } catch (error) {
        // print result
        console.warn(error);
    }
}
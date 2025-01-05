'use client'

/**
 * Navigate to a given route for a given loggedIn state.
 * @param route : a given route
 * @param loggedIn : a login state
 */
const isUserLoggedIn = (route: string, loggedIn: any) => {

  try {
    // check if window object exists
    if (typeof window !== "undefined") {
      if (loggedIn) {
        // navigate to a given route
        window.location.assign(route);
      } else {
        // navigate to sign in page
        window.location.assign("/auth/signin");
      }
    }
  } catch (error) {
    // log error if any
     console.warn(error);
  }
}

export {
  isUserLoggedIn
}
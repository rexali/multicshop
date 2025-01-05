
function verifyUser(token:any) {

    if (token) {

        return true;
    }

    return false;
}

export {
    verifyUser
}
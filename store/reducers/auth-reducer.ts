import { ActionTypes } from '../actions/auth-actions';

const reducer = (state: any, action: any) => {

    switch (action.type) {

        case ActionTypes.SIGN_IN:

            return {
                ...state,
                isSignout: false,
                user: action.payload,
            };

        case ActionTypes.SIGN_OUT:

            return {
                ...state,
                isSignout: true,
                user: null,
            };

        case ActionTypes.SIGN_UP:

            return {
                ...state,
                user: action.payload,
                isSignout: true,
            };

        case ActionTypes.RESTORE_TOKEN:

            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default reducer;

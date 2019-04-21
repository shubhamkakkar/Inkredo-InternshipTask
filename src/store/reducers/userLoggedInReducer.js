import { USER_LOGGED_IN } from "../actions"

export default (state = "", action) => {
    switch (action.type) {
        case USER_LOGGED_IN: {
            return action.accessToken

        }
        default: {
            return state
        }
    }
}
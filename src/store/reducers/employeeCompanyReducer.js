import { EMPLOYEE_COMPANY } from "../actions"

export default (state = "", action) => {
    switch (action.type) {
        case EMPLOYEE_COMPANY: {
            return action.empCompanyData

        }
        default: {
            return state
        }
    }
}
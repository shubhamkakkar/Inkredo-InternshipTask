import { EMPLOYEE_INFO } from "../actions"

const employeeReducer = (state = {}, action) => {
    switch (action.type) {
        case EMPLOYEE_INFO: {
            console.log(action.employeeData)

            return {
                ...state,
                employeeData: action.employeeData
            }
        }
        default: {
            return state
        }
    }
}
export default employeeReducer
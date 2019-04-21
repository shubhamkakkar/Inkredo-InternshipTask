import { combineReducers } from 'redux'
import companysListReducer from "./companysListReducer"
import userLoggedInReducer from "./userLoggedInReducer"
import employeeInfoReducer from "./employeeInfoReducer"
import employeeCompanyReducer from "./employeeCompanyReducer"

const rootReducer = combineReducers({
    companysList: companysListReducer,
    userLoggedIn: userLoggedInReducer,
    employeeInfo: employeeInfoReducer,
    employeeCompany: employeeCompanyReducer
})
export default rootReducer
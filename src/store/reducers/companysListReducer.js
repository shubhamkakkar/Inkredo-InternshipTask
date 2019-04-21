import { COMPANYS_LIST } from "../actions"

const companysListReducer = (state = [], action) => {
    switch (action.type) {
        case COMPANYS_LIST: {
            console.log(state)
            return {
                ...state,
                companyData: [...action.companyData]
        }
        }
        default: {
            return state
        }
    }
}
export default companysListReducer
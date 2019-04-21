import axios from "axios";

export const COMPANYS_LIST = "COMPANYS_LIST"
export const USER_LOGGED_IN = "USER_LOGGED_IN"
export const EMPLOYEE_INFO = "EMPLOYEE_INFO"
export const EMPLOYEE_COMPANY = "EMPLOYEE_COMPANY"

export const companysList = companyData => {
    return {
        type: COMPANYS_LIST,
        companyData
    }
}

export const userLoggedIn = accessToken => {
    localStorage.setItem("token", accessToken);
    return {
        type: USER_LOGGED_IN,
        accessToken
    }
}


export const employeeInfoLoad = employeeData => {
    if (Object.keys(employeeData).length > 1) {
        axios.put("https://inkredo-247ef.firebaseio.com/employeeData/" + localStorage.getItem("token") + ".json", employeeData)
            .then(res => res)
            .catch(er => er)
    }
    return {
        type: EMPLOYEE_INFO,
        employeeData
    }
}


export const employeeCompany = empCompanyData => {
    axios.put("https://inkredo-247ef.firebaseio.com/employeeCompany/" + localStorage.getItem("token") + ".json", empCompanyData)
        .then(res => res)
        .catch(er => er)
    return {
        type: EMPLOYEE_COMPANY,
        empCompanyData
    }
}
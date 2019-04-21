export const COMPANYS_LIST = "COMPANYS_LIST"
export const USER_LOGGED_IN = "USER_LOGGED_IN"
export const EMPLOYEE_INFO = "EMPLOYEE_INFO"
export const EMPLOYEE_COMPANY = "EMPLOYEE_COMPANY"

export const companysList = companyData => {
    //into firebase
    // localStorage.setItem("companysList", JSON.stringify(companyData));
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
    console.log(employeeData)
    //into firebase
    // localStorage.setItem("employeeInfo", JSON.stringify(employeeData));
    return {
        type: EMPLOYEE_INFO,
        employeeData
    }
}


export const employeeCompany = empCompanyData => {
    //into firebase
    // localStorage.setItem("empCompanyData", JSON.stringify(empCompanyData));
    return {
        type: EMPLOYEE_COMPANY,
        empCompanyData
    }
}
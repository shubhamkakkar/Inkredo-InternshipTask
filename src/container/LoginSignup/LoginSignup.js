import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { userLoggedIn, employeeInfoLoad } from "../../store/actions"

import DivFlexGrow from "../../components/HOC/DivFlexGrow";
import { Grid, Button } from "@material-ui/core";
import LoginSignupForm from "../../components/LoginSignupForm/LoginSignupForm"
import Navbar from "../Navbar/Navbar";


const url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"

class LoginSignup extends Component {
    state = {
        value: ["", ""],
        userInfo: [
            {
                label: "Email",
                placeholder: "abc@xyz.com",
                type: "email"
            },
            {
                label: "Password",
                placeholder: "Password",
                type: "password"
            }
        ],
        loginBool: false
    }
    componentWillMount() {
        if (!localStorage.getItem("token")) {
            const confirmPassword = {
                label: "Confirm Password",
                placeholder: "Confirm Password",
                type: "password"
            }
            this.setState({ value: [...this.state.value, ""], userInfo: [...this.state.userInfo, confirmPassword] })
        }
    }

    handleChange = (index, e) => {
        if (e.target.value.trim().length) {
            this.setState({
                value: { ...this.state.value, [index]: e.target.value }
            });
        } else {
            this.setState({
                value: { ...this.state.value, [index]: "" }
            });
        }
    };
    handleSignUp = () => {
        const { value } = this.state;
        if (value[0].length && value[1].length && value[2].length) {
            if (value[1] === value[2]) {
                axios.post(`${url}signupNewUser?key=${process.env.REACT_APP_API_KEY}`, {
                    email: value[0],
                    password: value[1]
                })
                    .then(res => {
                        this.props.sendAccessToken(res.data.localId)
                        this.props.employeeInfoLoad({
                            email: value[0]
                        })
                        this.props.history.push("/employee")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                alert("Passwords Dont match, try again")
            }
        } else {
            alert("Fill in all the fields")
        }
    }
    handelLogin = () => {
        const { value } = this.state
        if (value[0].length && value[1].length) {
            axios.post(`${url}verifyPassword?key=${process.env.REACT_APP_API_KEY}`, {
                email: value[0],
                password: value[1]
            })
                .then(res => {
                    this.props.sendAccessToken(res.data.localId)
                    this.props.employeeInfoLoad({
                        email: value[0]
                    })
                    this.forceUpdate()

                    this.props.history.push("/employee")
                })
                .catch(err => console.log(err))

        } else {
            alert("Fill in all the fields")
        }
    }
    loginUser = () => {
        let newUserInfo = this.state.userInfo
        newUserInfo.splice(2, 1)
        this.setState({
            value: ["", ""],
            loginBool: true,
            userInfo: newUserInfo
        })


    }

    //email, password
    render() {
        return (
            <DivFlexGrow>
                <Navbar />
                <Grid container style={{ marginTop: "5%" }}>
                    <Grid item sm={6} xs={12}
                        style={{ display: "block", margin: "auto" }}

                    >
                        <img
                            style={{ width: "550px", height: "550px", display: "block", margin: "auto" }}
                            src="https://cdn.dribbble.com/users/1568450/screenshots/5419750/work_1_dribbble-01.png" alt="sd" />
                    </Grid>
                    <Grid item sm={6} xs={12}
                        style={{ display: "block", margin: "auto" }}>
                        <Grid item xs={12}
                            style={{ display: "block", margin: "auto" }}>
                            {
                                this.state.userInfo.map((res, index) => (<LoginSignupForm
                                    key={res.label}
                                    index={index}
                                    label={res.label}
                                    placeholder={res.placeholder}
                                    handleChange={this.handleChange}
                                    type={res.type}
                                />))
                            }
                            <Grid item xs={12}
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    flexWrap: "wrap",
                                    justifyContent: "center"
                                }}>
                                {
                                    this.state.loginBool ?
                                        (<Button variant="contained" color="primary" onClick={this.handelLogin}>
                                            Login
                                        </Button>) :

                                        (<Button variant="contained" color="primary" onClick={this.handleSignUp}>
                                            sign up
                                        </Button>)
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>

                        {
                            !this.state.loginBool ?
                                (<Button color="secondary" variant="contained" onClick={this.loginUser}>
                                    Login
                                </Button>)
                                : null
                        }
                    </Grid>
                </Grid>
            </DivFlexGrow>
        )
    }
}
const mapStateToProps = ({ userLoggedIn }) => ({
    accessToken: userLoggedIn
})

const mapDispatchToProps = dispatch => ({
    sendAccessToken: accessToken => dispatch(userLoggedIn(accessToken)),
    employeeInfoLoad: employeeInfo => dispatch(employeeInfoLoad(employeeInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup)
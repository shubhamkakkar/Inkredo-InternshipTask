import React, { Component, Fragment } from "react"
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { userLoggedIn, companysList } from "../../store/actions"
import axios from "axios"
class Navigationbar extends Component {

    state = {
        token: "",
        forNavbarUpdate: true
    }
    setToken = () => {
        const token = localStorage.getItem("token")
        this.setState({ token })
        if (token) {
            this.props.sendAccessToken(token)
        }
    }
    componentWillMount() {
        if (localStorage.getItem("token")) {
            this.setToken()
        }
    }

    componentDidMount() {
        this.setToken()
    }


    logout = () => {
        localStorage.setItem("token", "");
        this.setToken()
        this.props.history.push("/")
    }

    render() {
        return (
            <AppBar position="fixed" style={{ marginBottom: "20px" }}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button color="inherit" onClick={() => {
                                this.setToken()
                                this.props.history.push("/")
                            }}>Home</Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            {
                                this.state.token ? (
                                    <div>
                                        <Button color="inherit" onClick={() => {
                                            this.setToken()
                                            this.props.history.push("/employee")
                                        }}>Profile</Button>
                                        <Button color="inherit" onClick={() => this.logout()}>Logout</Button>
                                    </div>

                                ) : (
                                        <Button color="inherit" onClick={() => this.props.history.push("/loginsignup")}>Login/Signup</Button>

                                    )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar >
        )
    }
}

const mapStateToProps = ({ userLoggedIn }) => ({
    accessToken: userLoggedIn
})
const mapDispatchToProps = dispatch => ({
    sendAccessToken: accessToken => dispatch(userLoggedIn(accessToken)),
    loadCompanyList: data => dispatch(companysList(data))

})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigationbar))
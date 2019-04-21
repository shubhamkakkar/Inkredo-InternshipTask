import React, { Component } from "react"
import DivFlexGrow from "../../components/HOC/DivFlexGrow";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Profile from "./Profile.js"
import Navbar from "../Navbar/Navbar";
class Employee extends Component {
    componentWillMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push("/loginsignup")
        }
    }
    render() {
        return (
            <DivFlexGrow>
                <Navbar />
                <Grid container style={{ marginTop: "5%" }}>
                    <Profile />
                </Grid>
            </DivFlexGrow>
        )
    }
}
const mapStateToProps = ({ userLoggedIn }) => ({
    accessToken: userLoggedIn
})

export default connect(mapStateToProps)(Employee)
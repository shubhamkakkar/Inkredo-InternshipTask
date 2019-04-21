import React, { Component } from "react"
import { Grid, Avatar, Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle, Card, CardContent, CardHeader } from "@material-ui/core"
import { connect } from "react-redux";
import { employeeInfoLoad, companysList } from "../../store/actions"
import DivFlexGrow from "../../components/HOC/DivFlexGrow";
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types';
import CompanysComponent from "../../components/CompanysComponent/CompanysComponent"
import withMobileDialog from '@material-ui/core/withMobileDialog';
import axios from "axios"
import staicUpdataCompany from '../Companys/companysData'

class Profile extends Component {

    componentWillMount() {

        axios.get("https://inkredo-247ef.firebaseio.com/employeeData/" + localStorage.getItem("token") + ".json")
            .then(res => {
                let value = []
                    value.push(res.data.email)
                    value.push(res.data.name)
                    value.push(res.data.phoneNumber)
                    value.push(res.data.currentCompany)
                this.setState({ value, incompleteProfile: false })

            })
            .catch(er => {
                const x = this.props.employeeInfo
                if (
                    Object.keys(x).length
                ) {
                    let value = []
                    value.push(x.employeeData.email)
                    value.push(x.employeeData.name)
                    value.push(x.employeeData.phoneNumber)
                    value.push(x.employeeData.currentCompany)
                    this.setState({ value, incompleteProfile: false })
                }
            })



        axios.get("https://inkredo-247ef.firebaseio.com/employeeCompany/" + localStorage.getItem("token") + ".json")
            .then(res => {
                let value = []
                value.push(res.data.name)
                value.push(res.data.location)
                value.push(res.data.description)
                this.setState({ employeeCompany: res.data, companyInfo: value })
            })
            .catch(er => {
                const employeeCompany = this.props.employeeCompany
                if (Object.keys(employeeCompany).length) {
                    let value = []
                    value.push(employeeCompany.name)
                    value.push(employeeCompany.location)
                    value.push(employeeCompany.description)
                    this.setState({ employeeCompany, companyInfo: value })
                }
            })

    }
    state = {
        open: false,
        openCompany: false,
        value: ["", "", "", ""],
        companyInfo: ["", "", ""],
        newcompanyInfo: ["", "", ""],
        incompleteProfile: true,
        employeeCompany: undefined
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    CreateCompany = () => {
        this.setState({ openCompany: true });
    };

    handleClose = () => {
        this.setState({ open: false, openCompany: false });
    };

    handleSubmit = () => {
        const value = this.state.value

        const email = value[0]
        const name = value[1]
        const phoneNumber = value[2]
        const currentCompany = value[3]
        if (email.length && name.length && phoneNumber.length && currentCompany.length) {
            const employeeInfoNew = { email, name, phoneNumber, currentCompany }
            this.props.employeeInfoLoad(employeeInfoNew)
            this.setState({ incompleteProfile: false })
            this.handleClose()

        } else {
            alert("Fill in all the  fields")
        }
    }
    handleSubmitCompany = () => {
        const value = this.state.newcompanyInfo
        const name = value[0]
        const location = value[1]
        const description = value[2]
        if (name.length && location.length && description.length) {
            const companyInfo = { name, location, description }
            // this.props.companysList(companyInfo)
            staicUpdataCompany.push(companyInfo)
            axios.put("https://inkredo-247ef.firebaseio.com/companysList.json", staicUpdataCompany).then(res => console.log("put")).catch(res => console.log(res))

            this.handleClose()

        } else {
            alert("Fill in all the  fields")
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
    handleCompany = (index, e) => {
        if (e.target.value.trim().length) {
            this.setState({
                newcompanyInfo: { ...this.state.newcompanyInfo, [index]: e.target.value }
            });
        } else {
            this.setState({
                newcompanyInfo: { ...this.state.newcompanyInfo, [index]: "" }
            });
        }
    };
    render() {
        const { fullScreen } = this.props;

        return (
            <DivFlexGrow>
                <Grid container justify="center" alignItems="center" style={{ padding: "6.35mm" }}>
                    <Grid item xs={12} sm={6}>
                        <Avatar style={{
                            margin: 10,
                            color: '#fff',
                            backgroundColor: "rgb(63, 81, 181)",
                            width: 200,
                            height: 200,
                        }}>
                            A
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {
                            !this.state.incompleteProfile ?
                                (
                                    <Card>
                                        <CardContent>
                                            <p>
                                                <span style={{ fontWeight: "200", color: "rgb(63, 81, 181)" }}>Email</span> : {this.state.value[0]}
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: "200", color: "rgb(63, 81, 181)" }}>Name</span> : {this.state.value[1]}
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: "200", color: "rgb(63, 81, 181)" }}>Phone Number</span> : {this.state.value[2]}
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: "200", color: "rgb(63, 81, 181)" }}>Current Company</span> : {this.state.value[3]}
                                            </p>
                                        </CardContent>

                                    </Card>
                                ) : <Card>
                                    <CardHeader title="Profile" />
                                </Card>
                        }
                    </Grid>
                    <Grid container >
                        <Grid item sm={6} xs={12} style={{ justifyContent: "center", margin: "5px", display: "flex", flex: 1 }}>
                            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                                Edit Profile
                            </Button>

                        </Grid>
                        <Grid item sm={6} xs={12} style={{ justifyContent: "center", margin: "5px", display: "flex", flex: 1 }}>
                            <Button variant="contained" color="secondary" onClick={this.CreateCompany}>
                                Create a Company
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container style={{ marginTop: "2.5%" }}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Button variant="contained" color="primary" onClick={() => this.props.history.push("/")}>
                            Explore Companies
                    </Button>
                    </Grid>
                </Grid>
                {
                    this.state.employeeCompany ? (
                        <Grid container style={{ marginTop: "2.5%" }}>
                            <CardHeader title="Employed at" />
                            <Grid item xs={12}>
                                <CompanysComponent dontShow={true} name={this.state.companyInfo[0]} location={this.state.companyInfo[2]} description={this.state.companyInfo[2]} />
                            </Grid>
                        </Grid>) : null
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={fullScreen}
                >

                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        {
                            [
                                "Email", "Name", "Phone Number", "Current Company"
                            ].map((res, index) =>
                                <TextField
                                    key={res}
                                    margin="dense"
                                    label={res}
                                    type="text"
                                    fullWidth
                                    onChange={e => this.handleChange(index, e)}
                                />
                            )
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openCompany}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={fullScreen}
                >
                    <DialogTitle id="form-dialog-title">Create Company</DialogTitle>
                    <DialogContent>
                        {
                            [
                                "Company Name", "Location", "Description"
                            ].map((res, index) =>
                                <TextField
                                    key={res}
                                    margin="dense"
                                    label={res}
                                    type="text"
                                    fullWidth
                                    onChange={e => this.handleCompany(index, e)}
                                />
                            )
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmitCompany} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </DivFlexGrow>
        )
    }
}
const mapStateToProps = ({ employeeInfo, employeeCompany }) => ({
    employeeInfo,
    employeeCompany
})
const mapDispatchToProps = dispatch => ({
    employeeInfoLoad: employeeInfo => dispatch(employeeInfoLoad(employeeInfo)),
    companysList: companydata => dispatch(companysList(companydata)),

})
Profile.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withRouter(Profile)))
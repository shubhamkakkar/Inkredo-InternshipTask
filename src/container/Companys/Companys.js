import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import { Grid, Dialog, Slide, AppBar, Toolbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { companysList, employeeCompany } from "../../store/actions"
import companysData from "./companysData"
import CompanysComponent from "../../components/CompanysComponent/CompanysComponent"
import DivFlexGrow from "../../components/HOC/DivFlexGrow"
import Loading from "../../components/Loading/Loading"
import Navbar from "../Navbar/Navbar";
import axios from "axios"

const styles = theme => ({
    title: {
        color: 'rgb(63, 81, 181)',
    }
});
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Companys extends Component {

    state = {
        open: false,
        dashboardContentIndex: undefined,
        dashboardContent: undefined,
        accessToken: "",
        companysData: []
    }

    componentWillMount() {
        axios.get("https://inkredo-247ef.firebaseio.com/companysList.json")
            .then(res => this.props.loadCompanysList(res.data))
            .catch(res =>
                this.props.loadCompanysList(companysData)
            )

    }

    componentDidMount() {
        this.setState({
            accessToken: this.props.accessToken,
            companysData: this.props.companysData
        })
    }
    showDashboard = index => {
        this.setState({
            open: true,
            dashboardContent: this.props.companysData[index],
            dashboardContentIndex: index
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    joinUs = index => {
        if (this.state.accessToken.length) {
            const toJoinCompanyData = this.props.companysData[index]
            this.props.employeeCompany(toJoinCompanyData)
            alert("Joined Successfully")
            this.handleClose()
        } else {
            alert("Login/Signup First")
            this.props.history.push("/loginsignup")
        }
    }

    render() {
        return (
            <DivFlexGrow>
                <Navbar />
                <Grid container style={{ marginTop: "5%" }}>
                    {
                        this.props.companysData ? (
                            <Fragment>
                                {
                                    this.props.companysData.map((res, index) =>
                                        <Grid item xs={12} sm={6} key={index}>
                                            <CompanysComponent
                                                name={res.name}
                                                location={res.location}
                                                description={res.description}
                                                customColor={this.props.classes.title}
                                                joinUs={() => this.joinUs(index)}
                                                showDashboard={() => this.showDashboard(index)} />
                                        </Grid>

                                    )
                                }
                            </Fragment>
                        ) :
                            <Loading />
                    }
                </Grid>
                {
                    this.state.open ?
                        (
                            <Dialog
                                fullScreen
                                open={this.state.open}
                                onClose={this.handleClose}
                                TransitionComponent={Transition}
                            >
                                <AppBar style={{ position: "relative" }}>
                                    <Toolbar>
                                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                            <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <Grid container>
                                    <CompanysComponent
                                        name={this.state.dashboardContent.name}
                                        location={this.state.dashboardContent.location}
                                        description={this.state.dashboardContent.description}
                                        customColor={this.props.classes.title}
                                        showDashboard={this.hadleClose}
                                        joinUs={() => this.joinUs(this.state.dashboardContentIndex)}
                                    />
                                </Grid>
                            </Dialog>
                        ) : null
                }
            </DivFlexGrow>
        )
    }
}

const mapStateToProps = ({ companysList, userLoggedIn }) => ({
    companysData: companysList.companyData,
    accessToken: userLoggedIn
})


const mapDispatchStateToProps = dispatch => ({
    loadCompanysList: data => dispatch(companysList(data)),
    employeeCompany: data => dispatch(employeeCompany(data))
})
export default withRouter(connect(mapStateToProps, mapDispatchStateToProps)(withStyles(styles)(Companys)))
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginAction } from "../actions/authAction";
import Spinner from '../components/Spinner/Spinner';
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import './css/login.css';
import { connect } from 'react-redux';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
        }

        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validateForm() {
        return this.state.userName.length > 0 && this.state.password.length > 0;
    }

    handleSubmit(event) {

        event.preventDefault();
        this.props.loginAction(this.state);
    }


    render() {

        const { fetching, loginData } = this.props;

        let authRedirect = null;
        if (loginData && localStorage.getItem('userToken')) {
            authRedirect = <Redirect to='/' />
        }

        return (
            <div className="Login">
                {authRedirect}

                <div className="SW">Star Wars</div>

                {fetching && <div className="SW-small"> <Spinner /> </div>}

                {!fetching && loginData && loginData == 'loginfailed' &&
                    <div className="SW-small">
                        <div className="SW-small">{' Login Failed, please check user name & password.'}</div> </div>}

                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel className="Text">UserName</ControlLabel>
                        <FormControl
                            autoFocus
                            type='text'
                            value={this.state.email}
                            onChange={e => this.setState({ userName: e.target.value })}
                        />
                        <ControlLabel className="Text">Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type='password'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </FormGroup>

                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </form>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        loginData: state.authReducer.loginData,
        fetching: state.authReducer.fetching
    };
}


export default connect(mapStateToProps, { loginAction })(Login);

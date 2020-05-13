import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { searchPlanets } from "../actions/searchAction";
import { FormControl } from 'react-bootstrap';
import { logout } from '../actions/authAction';
import './css/style.css';
import { verifySearch, updateSearch } from '../utils/SearchSessionMgr';

let timeoutId;
class Planets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exceedSearch: false,
    }


    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.onLogout();
    this.setState({ message: 'Logout Success' });
  }

  handleChange() {

    if (verifySearch()) {

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => this.props.onSearchPlanets(this.input.value), 200);
    }
    else {

      this.setState({ exceedSearch: true })
    }

  }
  render() {

    const logoutUser = (
      <div >
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </div>
    );

    const exceedSearch = (

      <div className="SW-small">
        <div className="SW-small">{' You have exceed the search limit'}</div> </div>
     );

    let authRedirect = <Redirect to='/login' />

    const { searchData, fetching } = this.props;
    return (
      <div className="container">

        <div className="row">
          {localStorage.getItem('userToken') ? logoutUser : authRedirect}
        </div>


        <div className="i-g">
          <span className="fa fa-search"></span>
          <row>
            <FormControl
              type="text"
              placeholder="Enter Name Planets Star Wars ..."
              onChange={this.handleChange}
              inputRef={ref => {
                this.input = ref;
              }}
              className="search"
            />

          </row>

        </div>

        <div className="row">
          {this.state.exceedSearch ? exceedSearch : null}
        </div>


        <div
          className="row"
          style={{
            marginTop: "30px",
            marginBottom: "30px"
          }}
        >
          <div className="col-md-5" />
          {fetching && <div className="col-md-1 loaders" />}
          <div className="col-md-5" />
        </div>
        <div className="content">
          {searchData &&
            searchData.map((result, key) => (
              <div className="col-md-8 box-content" key={key}>
                <h3 className="name">{result.name}</h3>
                <p className="prg">Climate : {result.climate}</p>
                <p className="prg">Diameter : {result.diameter}</p>
                <p className="prg">Gravity : {result.gravity}</p>
                <p className="prg">Orbita Period : {result.orbital_period}</p>
                <p className={result.css_notifier}>Population : {result.population}</p>
                <p className="prg">Rotation Period : {result.rotation_period}</p>
                <p className="prg">Surface Water : {result.surface_water}</p>
                <p className="prg">Terrain : {result.terrain}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchData: state.searchPlanets.all,
    fetching: state.searchPlanets.fetching,
    loginData: state.authReducer.loginData,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchPlanets: (searchParam) => {
      updateSearch();
      dispatch(searchPlanets(searchParam))
    },
    onLogout: () => dispatch(logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Planets);

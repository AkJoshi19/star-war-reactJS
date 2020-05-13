import { LOADING, LOGIN, LOGOUT } from "../../actions/constants";

const initialState = {
  loginData: '',
  fetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN:
      return {
        ...state,
        fetching: false,
        loginData: action.payload
      };
      case LOGOUT:
      return {
        ...state,
        loginData: action.payload
      };
   
    default:
      return state;
  }
}

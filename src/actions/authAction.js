
import { LOADING, LOGIN, LOGOUT } from "./constants";

export const loginAction = (loginData, callback) => {

    return (dispatch) => {

        dispatch({ type: LOADING });

        if (loginData.userName == 'Luke Skywalker' && loginData.password == '19BBY') {

            const token = 'abcd123456';
            
            const userInfo = {
                loginData,
                token
            }
            
            localStorage.setItem('userToken', JSON.stringify(userInfo));

            setTimeout(() => {

                dispatch({
                    type: LOGIN,
                    payload: userInfo
                });
            }, 3000)

        } else if (loginData.userName == 'Luke Demo' && loginData.password == '20BBY') {

            const token = 'demo762384234';
           

            const userInfo = {
                loginData,
                token
            }

            localStorage.setItem('userToken', JSON.stringify(userInfo)  );

            setTimeout(() => {

                dispatch({
                    type: LOGIN,
                    payload: userInfo
                });
            }, 3000)

        }
        else {
            setTimeout(() => {

                dispatch({
                    type: LOGIN,
                    payload: 'loginfailed'
                });
            }, 3000)
        }

    }

};


export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentCounter');
    localStorage.removeItem('idelTimeout');

    return (dispatch) => {

        dispatch({
            type: LOGOUT,
            payload: ''
        });
    };
};


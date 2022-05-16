import React, { useEffect, useState } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

// Edited by Jaewon Cho
const Login = () => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("googleId");
        return saved || "";
    })

    useEffect(() => {
        localStorage.setItem("googleId", user);
    }, [user]);

    const responseGoogleLogin = (response) => {
        console.log(response);
        setUser(response.googleId);
    }

    const responseGoogleLogout = () => {
        setUser("");
    }

    const loginFail =(response) => {
        console.log(response);
    }

    if(user == ""){
        return(
            <GoogleLogin
                clientId="536456760809-man02ffkaf2d3url0e1oj1dqoebiqo7v.apps.googleusercontent.com"
                render={renderProps => (
                    <a onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</a>)}
                onSuccess={responseGoogleLogin}
                onFailure={loginFail}
                cookiePolicy={'single_host_origin'}
              />
        )
    } else {
        return(
            <GoogleLogout
                clientId="536456760809-man02ffkaf2d3url0e1oj1dqoebiqo7v.apps.googleusercontent.com"
                render={renderProps => (
                    <a onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</a>)}
                onLogoutSuccess={responseGoogleLogout}
              />
        )
    }
}
export default Login;
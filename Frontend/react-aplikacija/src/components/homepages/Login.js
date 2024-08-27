import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h2>Login Page</h2>
            {/* Your login form goes here */}
            <Link to="/">Back to home page</Link>
        </div>
    );
};

export default Login;

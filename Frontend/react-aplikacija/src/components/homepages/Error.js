import React from "react";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Back to home page</Link>
        </div>
    );
};

export default ErrorPage;

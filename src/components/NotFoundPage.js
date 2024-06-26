import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 font-weight-bold">404</h1>
        <p className="lead">Page Not Found</p>
        <p>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

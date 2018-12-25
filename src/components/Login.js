import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => {
  return (
    <nav className="login">
      <p>Sing in to mamange your store</p>
      <button className="github" onClick={() => authenticate('Github')}>
        Log in with github
      </button>
    </nav>
  );
};

PropTypes.Login = {
  authenticate: PropTypes.func
};

export default Login;

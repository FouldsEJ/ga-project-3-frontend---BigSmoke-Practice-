import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await loginUser(user);

        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            onSubmit={handleSubmit}
            className="box column is-half is-offset-one-quarter"
          >
            <div className="field is-small">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control">
                <input
                  placeholder="Email"
                  name="email"
                  type="text"
                  className="input"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                ></input>
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="control">
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="input"
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <button type="submit" className="button is-fullwidth is-info">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

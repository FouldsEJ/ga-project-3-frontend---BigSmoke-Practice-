import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

function Login() {
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState(false);

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

        navigate('/profile');
      } catch (error) {
        setPopup(true);
      }
    };
    getData();
  }

  return (
    <section className='section login-section'>
      <div className='container'>
        <Popup trigger={popup} setTrigger={setPopup}>
          <h2>The email and password you entered did not match our records.</h2>
          <h2> Please double-check and try again or Register.</h2>
        </Popup>
        <div className='columns'>
          <form
            onSubmit={handleSubmit}
            className='box column is-half is-offset-one-quarter'
          >
            <div className='field is-small'>
              <label htmlFor='email' className='label'>
                Email
              </label>
              <div className='control has-icons-left'>
                <input
                  placeholder='Email'
                  name='email'
                  type='text'
                  className='input'
                  id='email'
                  value={user.email}
                  onChange={handleChange}
                ></input>
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label htmlFor='password' className='label'>
                Password
              </label>
              <div className='control has-icons-left'>
                <input
                  placeholder='Password'
                  name='password'
                  type='password'
                  className='input'
                  id='password'
                  value={user.password}
                  onChange={handleChange}
                ></input>
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </div>
            </div>
            <button type='submit' className='button is-fullwidth is-info'>
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

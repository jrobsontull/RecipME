import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';
import logo from '../assets/img/pie_logo_orange.svg';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.verified === true) {
      navigate('/my-recipes');
    }
  });

  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Welcome! This is a web-based recipie manager.</p>
        <p>
          To start using, please <Link to={'/login'}>sign in</Link> or{' '}
          <Link to={'/register'}>register</Link> for an account.
        </p>
      </div>
      <div className="line-br"></div>
      <div className="how-to">
        <h3>How to use:</h3>
        <ol>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
            ante vitae lorem.
          </li>
          <li>
            Morbi ultrices vehicula lorem, vitae sagittis nisi hendrerit
            laoreet. Duis porttitor facilisis ligula, vitae dapibus diam
            vulputate eu.
          </li>
          <li>
            Praesent sit amet eleifend nisl. Cras non risus arcu. Fusce
            dignissim quis ligula nec vestibulum.
          </li>
          <li>Etiam fringilla tellus.</li>
        </ol>
      </div>
      <img className="pie-logo" src={logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default Home;

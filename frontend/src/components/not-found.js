import { Link } from 'react-router-dom';
import logo from '../assets/img/pie_logo_orange.svg';

function NotFound() {
  return (
    <div className="react-container">
      <div className="intro-text">
        <p>
          Whoops! The page you are looking for doesn't exist. Click
          <Link to={'/'}> here</Link> to take you back to your home.
        </p>
      </div>
      <img className="pie-logo" src={logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default NotFound;

import Logo from '../assets/img/pie_logo_orange.svg';

function Loading() {
  return (
    <div className="react-container">
      <div className="loading-content">
        <img className="pie-logo loading" src={Logo} alt="logo" />
        <p>We're loading this page now</p>
      </div>
    </div>
  );
}

export default Loading;

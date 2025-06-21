import logo from '../images/logo-clitic-grand-tanger-website-01-1024x513.png';
import VideoBackground from './VideoBackground';
const Header = ({ showAuth, showSignup, toggleAuth }) => {
  return (
    <>
    <VideoBackground/>
    <header>
      <a href="/">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <button className="cta-button" onClick={toggleAuth}>
        {showAuth ? (showSignup ? 'LOGIN' : 'BECOME MEMBER') : 'BECOME MEMBER'}
      </button>
    </header>
    </>
  );
};

export default Header;
const Logo = ({ logoSrc }) => {
  return (
    <a className="navbar-brand h-100" href="/">
      <img src={logoSrc} className="h-100" />
    </a>
  );
};

export default Logo;

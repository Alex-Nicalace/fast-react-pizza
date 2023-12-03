import { Link } from 'react-router-dom';

interface IHeaderProps {}

function Header({}: IHeaderProps): JSX.Element {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <p>Alex</p>
    </header>
  );
}

export default Header;

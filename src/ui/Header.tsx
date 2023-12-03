import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

interface IHeaderProps {}

function Header({}: IHeaderProps): JSX.Element {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>

      <SearchOrder />

      <p>Alex</p>
    </header>
  );
}

export default Header;

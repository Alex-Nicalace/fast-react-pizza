import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

// interface IHeaderProps {}

function Header(): JSX.Element {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link className="tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;

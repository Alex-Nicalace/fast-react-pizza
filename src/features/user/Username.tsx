// interface IUsernameProps {}

import { useSelector } from "react-redux";
import { RootStore } from "../../store";

function Username(): JSX.Element {
  const userName = useSelector((state: RootStore) => state.user.userName);

  if (!userName) {
    return <></>;
  }

  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default Username;

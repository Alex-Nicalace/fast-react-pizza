// interface IUsernameProps {}

import { useAppSelector } from '../../hooks/reduxHooks';

function Username(): JSX.Element {
  const userName = useAppSelector((state) => state.user.userName);

  if (!userName) {
    return <></>;
  }

  return (
    <div className='hidden text-sm font-semibold md:block'>{userName}</div>
  );
}

export default Username;

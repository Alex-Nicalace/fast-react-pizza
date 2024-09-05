// interface IUsernameProps {}

import { useAppSelector } from '../../hooks/reduxHooks';
import { getName } from './userSlice';

function Username(): JSX.Element {
  // getName - селектор
  const userName = useAppSelector(getName);

  if (!userName) {
    return <></>;
  }

  return (
    <div className='hidden text-sm font-semibold md:block'>{userName}</div>
  );
}

export default Username;

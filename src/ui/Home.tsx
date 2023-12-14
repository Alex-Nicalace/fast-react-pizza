import CreateUser from '../features/user/CreateUser';
import { RootStore } from '../store';
import Button from './Button';
import { useAppSelector } from '../hooks/reduxHooks';

function Home() {
  const username = useAppSelector((state: RootStore) => state.user.userName);
  return (
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className=' mb-4 text-center text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username ? (
        <Button to='/menu'>Continue ordering {username}</Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;

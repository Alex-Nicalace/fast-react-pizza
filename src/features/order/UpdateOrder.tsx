import { useFetcher } from 'react-router-dom';
import { IOrderData } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

interface IUpdateOrderProps {
  order: IOrderData;
}

function UpdateOrder({ order }: IUpdateOrderProps): JSX.Element {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method='patch' className='text-right'>
      <Button >
        Make priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

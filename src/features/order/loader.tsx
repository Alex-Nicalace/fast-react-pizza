import { LoaderFunctionArgs } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';

export async function loader({ params }: LoaderFunctionArgs) {
  const { orederId } = params;
  if (!orederId) return null;

  const order = await getOrder(orederId);
  return order;
}

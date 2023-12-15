import { ActionFunctionArgs } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

export async function action({ params }: ActionFunctionArgs) {
  const { orederId } = params;
  if (!orederId) return null;
  await updateOrder(orederId, { priority: true });
  return null;
}

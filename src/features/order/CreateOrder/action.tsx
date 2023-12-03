import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { IOrderData, createOrder } from '../../../services/apiRestaurant';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string) as IOrderData['cart'],
    priority: Boolean(data.priority),
  } as IOrderData;
  // console.log(order);
  const newOrder = await createOrder(order);
  redirect(`/order/${newOrder.id}`);
}

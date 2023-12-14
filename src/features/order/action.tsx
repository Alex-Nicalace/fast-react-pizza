import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { IOrderData, createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';
import store from '../../store';
import { claerCart } from '../cart/cartSlice';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string) as IOrderData['cart'],
    priority: Boolean(data.priority),
  } as IOrderData;

  //* <объект с ошибками> потом в компоненте с помощью useActionData передаем этот объект
  const errors: Record<string, string> = {
    ...(!isValidPhone(order.phone) && { phone: 'Invalid phone number' }),
  };
  if (Object.keys(errors).length) {
    return errors;
  }
  //* </ объект с ошибками>

  const newOrder = await createOrder(order);

  // * здесь нельзя использовать хуки т.к. это не компонент поэтому надо использовать store
  // * НО НЕЛЬЗЯ ЭТИМ ЗЛОУПОТРЕБЛЯТЬ т.к. такой способ отключает некоторые оптимизации
  store.dispatch(claerCart());

  return redirect(`/order/${newOrder.id}`);
}

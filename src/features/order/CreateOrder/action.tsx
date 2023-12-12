import { ActionFunctionArgs, redirect } from "react-router-dom";
import { IOrderData, createOrder } from "../../../services/apiRestaurant";
import { isValidPhone } from "../../../utils/helpers";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string) as IOrderData["cart"],
    priority: Boolean(data.priority),
  } as IOrderData;

  //* <объект с ошибками> потом в компоненте с помощью useActionData передаем этот объект
  const errors: Record<string, string> = {
    ...(!isValidPhone(order.phone) && { phone: "Invalid phone number" }),
  };
  if (Object.keys(errors).length) {
    return errors;
  }
  //* </ объект с ошибками>

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

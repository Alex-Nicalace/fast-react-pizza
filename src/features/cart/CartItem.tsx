import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { IItemCartData } from "./Cart";

interface ICartItemProps {
  item: IItemCartData;
}
function CartItem({ item }: ICartItemProps): JSX.Element {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button mode="small">Remove</Button>
      </div>
    </li>
  );
}

export default CartItem;

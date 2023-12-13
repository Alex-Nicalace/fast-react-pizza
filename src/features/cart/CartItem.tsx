import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { IItemCartData } from "./Cart";
import { deleteItem } from "./cartSlice";

interface ICartItemProps {
  item: IItemCartData;
}
function CartItem({ item }: ICartItemProps): JSX.Element {
  const dispatch = useDispatch();
  const { name, quantity, totalPrice } = item;

  function handleRemoveItem() {
    dispatch(deleteItem(item.pizzaId));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button onClick={handleRemoveItem} mode="small">
          Remove
        </Button>
      </div>
    </li>
  );
}

export default CartItem;

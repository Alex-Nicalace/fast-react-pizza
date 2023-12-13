import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

interface IDeleteItemProps {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: IDeleteItemProps): JSX.Element {
  const dispatch = useDispatch();
  function handleRemoveItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button onClick={handleRemoveItem} mode="small">
      Remove
    </Button>
  );
}

export default DeleteItem;

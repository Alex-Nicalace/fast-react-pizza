import { useDispatch } from "react-redux";
import { IPizzaData } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";

interface IMenuItenProps {
  pizza: IPizzaData;
}

function MenuItem({ pizza }: IMenuItenProps) {
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-70 grayscale"}`}
      />
      <div className="flex flex-1 flex-col pt-0.5">
        <p className="font-semibold">{name}</p>
        <p className="flex-1 text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <Button onClick={handleAddToCart} mode="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

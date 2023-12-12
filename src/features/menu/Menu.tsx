import { useLoaderData } from "react-router-dom";
import { IPizzaData } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu(): JSX.Element {
  const menu = useLoaderData() as IPizzaData[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;

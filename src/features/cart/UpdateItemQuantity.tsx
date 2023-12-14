import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decItemQuantity, incItemQuantity } from './cartSlice';

interface IUpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity: number;
}
function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: IUpdateItemQuantityProps): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button mode='round' onClick={() => dispatch(decItemQuantity(pizzaId))}>
        -
      </Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button mode='round' onClick={() => dispatch(incItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

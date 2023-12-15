import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../../ui/Button';
import { getCart, getSummary } from '../../cart/cartSlice';
import EmptyCart from '../../cart/EmptyCart';
import { formatCurrency } from '../../../utils/helpers';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchAddress, getUser } from '../../user/userSlice';

function CreateOrder(): JSX.Element {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const { state } = navigation;
  const isSubmitting = state === 'submitting';
  const formError = useActionData() as Record<string, string>;
  const cart = useAppSelector(getCart);
  const totalPrice = useAppSelector(getSummary).totalPrice;
  const priorityPrice = withPriority ? (totalPrice * 20) / 100 : 0;
  const totalPriceWithPriority = totalPrice + priorityPrice;
  const dispatch = useAppDispatch();
  const {
    address,
    position,
    status: addressStatus,
    userName,
    error: addressError,
  } = useAppSelector(getUser);
  const isLoading = addressError === 'loading';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='post'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            required
            defaultValue={userName}
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formError?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='relative grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              required
              defaultValue={address}
              disabled={isLoading}
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {addressError}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <div className='absolute right-1 top-1'>
                <Button
                  mode='small'
                  type='button'
                  onClick={() => dispatch(fetchAddress())}
                  disabled={isLoading}
                >
                  Get address
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.latitude
                ? `${position.longitude},${position.latitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? 'Sending ...'
              : `Order now from ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

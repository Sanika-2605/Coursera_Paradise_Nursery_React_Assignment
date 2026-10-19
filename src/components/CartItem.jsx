import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Leaf } from 'lucide-react';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartSubtotal,
  setCheckoutMessage,
} from '../features/cart/CartSlice.jsx';

const money = (amount) => `$${Number(amount).toFixed(2)}`;

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const checkoutMessage = useSelector((state) => state.cart.checkoutMessage);

  // Standard Coursera rubric helper functions
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id || item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id || item.name));
  };

  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onContinueShopping) onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    alert('Functionality to be added for future reference');
    dispatch(setCheckoutMessage('Your plants are reserved in this demo. Checkout is coming soon!'));
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = calculateTotalAmount();

  if (items.length === 0) {
    return (
      <main className="cart-page page-shell">
        <div className="cart-heading">
          <div>
            <span className="eyebrow">YOUR LITTLE JUNGLE</span>
            <h1>Shopping cart</h1>
          </div>
        </div>
        <section className="empty-cart">
          <span className="empty-cart-icon">
            <ShoppingBag size={30} />
          </span>
          <h2>Your cart is taking a little breather.</h2>
          <p>There are no plants here yet. Find a leafy friend to bring home.</p>
          <button className="primary-button" onClick={handleContinueShopping}>
            <ArrowLeft size={17} /> Explore plants
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page page-shell">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR LITTLE JUNGLE</span>
          <h1>Shopping cart</h1>
        </div>
        <span className="cart-items-count">{totalQuantity} items</span>
      </div>

      <div className="cart-layout">
        <section className="cart-items-list" aria-label="Items in your cart">
          {items.map((item) => (
            <article className="cart-row" key={item.id || item.name}>
              <img className="cart-thumb" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <span className="product-category">{item.category}</span>
                <h2>{item.name}</h2>
                <span className="cart-unit-price">
                  {money(item.price)} <span>each</span>
                </span>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>{money(calculateTotalCost(item))}</strong>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => handleRemove(item)}
                >
                  <Trash2 size={15} /> Remove
                </button>
              </div>
            </article>
          ))}
          <button className="continue-link" onClick={handleContinueShopping}>
            <ArrowLeft size={16} /> Continue shopping
          </button>
        </section>

        <aside className="order-summary">
          <span className="eyebrow">THE GOOD STUFF</span>
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>Items ({totalQuantity})</span>
            <span>{money(totalAmount)}</span>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <span className="free-delivery">Free</span>
          </div>
          <div className="summary-line">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-total">
            <span>Total Cart Amount</span>
            <strong>{money(totalAmount)}</strong>
          </div>
          <p className="summary-note">
            <Leaf size={15} /> Good things grow when shared. Delivery is on us.
          </p>
          <button className="checkout-button" onClick={handleCheckoutShopping}>
            Checkout <span>→</span>
          </button>
          {checkoutMessage && (
            <p className="checkout-message" role="status">
              {checkoutMessage}
            </p>
          )}
          <button className="clear-cart-button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </aside>
      </div>
    </main>
  );
}

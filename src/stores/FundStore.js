import alt from '../alt';
import ProductStore from './ProductStore';
import CartActions from '../actions/CartActions';

// Initial funds
const initial = 1571.69;
// Remaining funds on last checkout
var remaining;

class FundStore {
  constructor() {
    this.funds = initial;
    this.bindActions(CartActions);
  }

  onAdd(id) {
    // If the price does not outweigh the cost, we'll proceed,
    // and deduct the newly aded item to the number of funds.
    // Otherwise, don't trigger any bullshit.
    try {
      const index = ProductStore.getProductIndex(id);
      var product = ProductStore.getState().products.get(id);
    } catch(e) {
      return false;
    }

    var diff = this.funds - product.get('price');

    if ( diff < 0 ) {
      return false;
    }

    this.funds = diff;
  }

  onRemove() {
    // Do something the opposite of add
  }

  onClear() {
    // When the user wants to clear, we'd set it
    // to the remaining funds (which is set when
    // the cart is checked out). Otherwise, to the
    // initial.
    this.funds = remaining !== undefined
      ? remaining
      : initial;
  }

  onCheckout() {
    remaining = this.funds;
    return false;
  }
}

export default alt.createStore(FundStore);

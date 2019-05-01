import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const order = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(order)
  });
};

const purchaseBurgerFailure = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrdersFailure = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // purchase reducers
    case actions.PURCHASE_INIT: return purchaseInit(state, action);
    case actions.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actions.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actions.PURCHASE_BURGER_FAILURE: return purchaseBurgerFailure(state, action);
      

    // fetch orders reducers
    case actions.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actions.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actions.FETCH_ORDERS_FAILURE: return fetchOrdersFailure(state, action);
      
    default: return state;
  }
};

export default reducer;
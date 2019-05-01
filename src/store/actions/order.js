import * as actions from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    orderId: id, 
    orderData: data
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAILURE,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (data, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, data)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, data));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actions.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFailure = (error) => {
  return {
    type: actions.FETCH_ORDERS_FAILURE,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const orders = [];

        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailure(error));
      });
  }
}
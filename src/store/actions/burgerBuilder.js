import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings
  };
};

const fetchIngredientsFailure = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILURE
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-b61ad.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailure());
    });
  }
};
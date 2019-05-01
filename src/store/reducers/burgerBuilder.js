import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const startPrice = 4;

const initialState = {
  ingredients: null,
  totalPrice: startPrice,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  }
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: startPrice,
    building: false
  });
}

const fetchIngredientsFaileure = (state, action) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.ADD_INGREDIENT: return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actions.SET_INGREDIENTS: return setIngredients(state, action);
    case actions.FETCH_INGREDIENT_FAILURE: return fetchIngredientsFaileure(state, action);
    default: return state;
  }
};

export default reducer;
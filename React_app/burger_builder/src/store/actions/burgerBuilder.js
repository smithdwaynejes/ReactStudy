import * as actionTypes from './actionTypes';

export const addIngredients = (ingName) => {
    return { type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName };
}

export const removeIngredients = ingName => {
    console.log('remove')
  return { type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName };
};
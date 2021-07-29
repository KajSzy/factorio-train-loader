import recipes from "../data/recipies.json";

export const getRecipe = (name: string) =>
  recipes.find((recipe) => recipe.name.match(new RegExp(name, "i")));

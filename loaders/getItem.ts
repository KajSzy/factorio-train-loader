import items from "../data/items.json";

export const getItem = (name: string) =>
  items.find((item) => item.name === name);

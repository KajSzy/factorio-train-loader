import { getItem } from "./loaders/getItem";

const TOTAL_WAGON_SLOT = 40;

const TOTAL_WAGON_COUNT = 8;

const ingredients = [
  {
    name: "Copper plate",
    amount: 20,
  },
  {
    name: "Plastic bar",
    amount: 5,
  },
  {
    name: "Steel plate",
    amount: 2,
  },
] as const;

type IngredientsNames = typeof ingredients[number]["name"];

type Cargo = {
  "per wagon": number;
  "per train": number;
  stacks: number;
};

const results = [];

for (let i = 1; i < TOTAL_WAGON_SLOT + 1; i++) {
  let ingredientsSum = 0;
  let totalStacks = 0;
  const cargo = ingredients.reduce((prev, curr) => {
    prev[curr.name] = { stacks: 0, "per train": 0, "per wagon": 0 };
    return prev;
  }, {} as Record<IngredientsNames, Cargo>);
  ingredients.forEach((item) => {
    const itemStackSize = getItem(item.name)?.stack;
    if (!itemStackSize) {
      throw new Error(`Selected item has no stack size ${item.name}`);
    }
    const totalItemNumber = itemStackSize * item.amount * i;
    ingredientsSum += totalItemNumber;
    totalStacks += totalItemNumber / itemStackSize;
    cargo[item.name] = {
      "per wagon": totalItemNumber,
      "per train": totalItemNumber * TOTAL_WAGON_COUNT,
      stacks: totalItemNumber / itemStackSize,
    };
  });

  results.push({
    iteration: i,
    cargo,
    totalCargo: ingredientsSum,
    totalStacks,
  });
}

const overflowedResultIndex = results.findIndex(
  (result) => result.totalCargo > 4000
);

const properResult = results[overflowedResultIndex - 1];

console.log("Maximum combined cargo is", properResult.totalCargo);
console.log(
  "Cargo will take",
  properResult.totalStacks,
  "from",
  TOTAL_WAGON_SLOT,
  "slots in each wagon"
);

console.table(properResult.cargo);

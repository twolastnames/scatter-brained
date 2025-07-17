let cards = [1, 2, 3, 5];

try {
  cards = eval(import.meta.env.VITE_CARDS);
} catch {
  console.error(
    `invalid VITE_CARDS value. good example: VITE_CARDS='["1/2",5,6]'`,
  );
}

export const cardMap = cards;

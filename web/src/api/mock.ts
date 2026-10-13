export type CartItem = {
  id: string;
  name: string;
  weightLabel: string;
  weight?: string;
  price: number;
  thumb: "milk" | "bread" | "cheese";
};

export const mockCart: { items: CartItem[]; deliveryFee: number } = {
  items: [
    { id: "milk", name: "Молоко 2,5%", weightLabel: "1 л", weight: "1 л", price: 109, thumb: "milk" },
    { id: "bread", name: "Хлеб бородинский", weightLabel: "400 г", weight: "400 г", price: 89, thumb: "bread" },
    { id: "cheese", name: "Сыр российский", weightLabel: "200 г", price: 349, thumb: "cheese" },
  ],
  deliveryFee: 59,
};

export const mockGoalOptions = [
  { links: 5, reward: 150 },
  { links: 8, reward: 300 },
  { links: 15, reward: 600 },
];
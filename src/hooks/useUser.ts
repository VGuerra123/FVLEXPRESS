import usersData from "../data/users.json";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
}

export const useUser = (userId: string = "u1") => {
  const user: User | undefined = usersData.find((u) => u.id === userId);

  return {
    current: user,
    orders: user?.orders ?? [],
  };
};

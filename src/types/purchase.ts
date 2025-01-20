import { UserType } from "./user";

export type PurchaseType = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
};

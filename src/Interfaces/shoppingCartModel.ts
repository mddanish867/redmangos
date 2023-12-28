import cartItemModel from "./cartItemModel";

export interface shoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: cartItemModel[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}

import { cartItemModel, shoppingCartModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface orderSummaryProps{
    data:{
        id?:number;
        cartItems?:shoppingCartModel[];
        cartTotal?: number;
        userId?: number;
        stripePaymentIntentId?: string;
        status?: SD_Status;
    };
    userInput:{
        name?: string;
        email?: string;
        phoneNumber?: string;
    }
}
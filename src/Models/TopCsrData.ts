import { User } from "./User";

export class TopCsrData {
   user : User
   ordersNB: number;
   ordersCoast:number
    
    constructor(user: User, ordersNB: number ,ordersCoast: number) {
      this.user = user;
      this.ordersNB = ordersNB;
      this.ordersCoast = ordersCoast;
 
    }
  }
import { Sales } from "./Sales";
export class TopDishData {
  dishId: number;
  dishName: string;
  sales: Sales[];
  totalAmountAllDays: number;
  totalQuantitySoldAllDays: number;
  
  constructor(dishId: number, dishName: string, sales: Sales[],totalAmountAllDays: number ,totalQuantitySoldAllDays: number) {
    this.dishId = dishId;
    this.dishName = dishName;
    this.sales = sales;
   this.totalAmountAllDays = totalAmountAllDays;
   this.totalQuantitySoldAllDays = totalQuantitySoldAllDays
  }
}

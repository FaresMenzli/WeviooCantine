export class Sales {
    date: string;
    dayQuantitySold: number;
    dayTotalAmount: number;

    constructor(date: string, dayQuantitySold: number, dayTotalAmount: number) {
        this.date = date;
        this.dayQuantitySold = dayQuantitySold;
        this.dayTotalAmount = dayTotalAmount;
      }
  }
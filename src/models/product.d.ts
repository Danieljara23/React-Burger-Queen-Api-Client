export enum PRODUCT_TYPE {
  breakfast = "Desayuno",
  lunch = "Almuerzo",
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  type: PRODUCT_TYPE;
  dateEntry: string;
}

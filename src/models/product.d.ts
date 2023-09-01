export type PRODUCT_TYPE = "Desayuno" | "Almuerzo";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: PRODUCT_TYPE;
  dateEntry: string;
};

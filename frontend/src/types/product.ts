export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  ratingRate: number;
  ratingCount: number;
}

export interface Product extends CreateProductDto {
  id: number;
}

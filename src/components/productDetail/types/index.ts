export interface Product {
  imgUrl: string;
  title: string;
  rating: number;
  reviews?: {
    userImage: string;
    userName: string;
    description?: string;
    rating: number;
    date: string;
  }[];
  sizes?: string[];
  sold: number;
  price: number;
  discountPrice?: number;
  description?: string;
}

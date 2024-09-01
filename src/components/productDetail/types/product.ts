export interface ProductTypes {
  id: number;
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
  discountPrice?: number | null;
  description?: string;
  isLike: boolean;
}

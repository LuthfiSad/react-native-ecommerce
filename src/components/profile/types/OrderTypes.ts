export interface OrderTypes {
  id: number;
  imgUrl: string;
  quantity: number;
  discountPrice?: number | null;
  originalPrice: number;
  nameOrder: string;
  shippingCost?: number | null;
  voucherDiscount?: number | null;
}

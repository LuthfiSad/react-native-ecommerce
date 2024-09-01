export const recentPurchases = [
  {
    id: 1,
    imgUrl: 'https://picsum.photos/200/300',
    nameOrder: 'Order 1',
    quantity: 1,
    discountPrice: 500000,
    originalPrice: 1000000,
    location: 'Jl. Contoh Destination 1',
    originAddress: 'Jl. Contoh Origin 1',
    shippingCost: 10000,
    voucherDiscount: 20000, // contoh ada voucher discount
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/200/300',
    nameOrder: 'Order 2',
    quantity: 1,
    discountPrice: null, // tidak ada discount price
    originalPrice: 2000,
    location: 'Jl. Contoh Destination 2',
    originAddress: 'Jl. Contoh Origin 2',
    shippingCost: 15000,
    voucherDiscount: 0, // contoh tidak ada voucher discount
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/200/300',
    nameOrder: 'Order 3',
    quantity: 9,
    discountPrice: 900000,
    originalPrice: 1000000,
    location: 'Jl. Contoh Destination 3',
    originAddress: 'Jl. Contoh Origin 3',
    shippingCost: 20000,
    voucherDiscount: undefined, // contoh tidak ada voucher discount
  },
];

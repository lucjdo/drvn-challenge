export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: ReturnPolicy;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export type DisplayedProduct = Pick<
  Product,
  'id' | 'title' | 'brand' | 'price' | 'stock' | 'rating' | 'thumbnail'
>;

export enum AvailabilityStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
}

export enum Category {
  All = 'all',
  Beauty = 'beauty',
  Fragrances = 'fragrances',
  Furniture = 'furniture',
  Groceries = 'groceries',
  HomeDecoration = 'home-decoration',
  KitchenAccessories = 'kitchen-accessories',
  Laptops = 'laptops',
  MensShirts = 'mens-shirts',
  MensShoes = 'mens-shoes',
  MensWatches = 'mens-watches',
  MobileAccessories = 'mobile-accessories',
  Motorcycle = 'motorcycle',
  SkinCare = 'skin-care',
  Smartphones = 'smartphones',
  SportsAccessories = 'sports-accessories',
  Sunglasses = 'sunglasses',
  Tablets = 'tablets',
  Tops = 'tops',
  Vehicle = 'vehicle',
  WomensBags = 'womens-bags',
  WomensDresses = 'womens-dresses',
  WomensJewellery = 'womens-jewellery',
  WomensShoes = 'womens-shoes',
  WomensWatches = 'womens-watches',
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export enum ReturnPolicy {
  NoReturnPolicy = 'No return policy',
  The30DaysReturnPolicy = '30 days return policy',
  The60DaysReturnPolicy = '60 days return policy',
  The7DaysReturnPolicy = '7 days return policy',
  The90DaysReturnPolicy = '90 days return policy',
}

export interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

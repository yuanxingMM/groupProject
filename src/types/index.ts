export interface DealsItemsData {
  firstImage: string,
  productId: string,
  productTitle: string,
}


export interface CartItem {
  productId: string;
  quantity: number;
  productTitle: string;
  productNumber: number;
  productPrice: number;
  mainImages: Array<string>;
}


export interface CartState {
  items: CartItem[];
}

export interface ProductItemData {
  productId: string;
  productTitle: string;
  productPrice: string;
  productNumber: number;
  productFirstImg: string;
  sellQuantity: number;
  views: number;
  expired: boolean;
  showSellQuantity?: boolean;
  canEdit?: boolean;
}

export interface MoreProductItemData {
  productId: string;
  productTitle: string;
  productPrice: string;
  productNumber: number;
  description: string;
  mainImages: [];
}

export interface HistoryOrderItemData {
  productId: string;
  productTitle: string;
  productPrice: string;
  mainImages: Array<string>;
  quantity: number;
  buyTime: string;
  createdAt: string;
  expired: boolean;
}
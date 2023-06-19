export interface ProductInterface {
  productId?: string;
  name?: string;
  level?: string;
  activate?: string;
  details?: string;
  type?: string;
  category?: string;
  groupIds?: string[];
  productGroup?: any;
}

export enum ProductCategory {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ALL = ''
}

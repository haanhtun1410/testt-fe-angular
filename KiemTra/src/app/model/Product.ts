import { Status } from './Status';
import { SubCategory } from './SubCategory';
import { Brand } from './Brand';

export interface Product {
  id: number;
  productName: string;
  color: string;
  quantity: number;
  sellPrice: number;
  originPrice: number;
  description: string;
  status: Status;
  subcate: SubCategory;
  brands: Brand[];
}

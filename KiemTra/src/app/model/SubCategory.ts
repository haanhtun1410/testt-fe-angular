import { Category } from './Category';

export interface SubCategory {
  id: number;
  subCateCode: string;
  subCateName: string;
  category: Category;
}

import { TypeMaterialIconName } from '@/shared/types/icon.types';

export interface IGenre {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: TypeMaterialIconName;
}

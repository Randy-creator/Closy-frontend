export type ClothingCategory = "TOP" | "BOTTOM" | "SHOES" | "ACCESSORY";

export interface ClothingItem {
  id?: number;
  name: string;
  category: ClothingCategory;
  color: string;
  size?: string;
  brand?: string;
}

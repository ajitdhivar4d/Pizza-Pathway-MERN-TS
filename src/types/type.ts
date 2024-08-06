export interface Option {
  [key: string]: number | string;
}

export interface ItemDocument {
  categoryName: string;
  name: string;
  img: string;
  options: Option[];
  description: string;
}

export interface ApiResponse {
  items: ItemDocument[];
}

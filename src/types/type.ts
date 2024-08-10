export interface Option {
  type: string;
  price: number;
}

export interface FoodItemDocument {
  categoryName: string;
  name: string;
  img: string;
  options: Option[];
  description: string;
}

export interface FoodApiResponse {
  FoodItems: FoodItemDocument[];
}

//

export interface CardItemProps {
  img: string;
  name: string;
  options: Option[];
}
//
export interface CartItem {
  name: string;
  quantity: number;
  option: string;
  amount: number;
}

export interface CartState {
  items: CartItem[];
}
//
export interface MiscState {
  search: string;
  cartCount: number;
}

//
export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export interface UserApiResponse {
  success: boolean;
  user?: UserProfile;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
//
export interface AuthState {
  userInfo: UserProfile | null;
}

import { ReactNode } from "react";

export interface CheckoutWizardProps {
  activeStep: number;
}

export interface DropdownLinkProps {
  href: string;
  children: ReactNode;
  [key: string]: any;
}

export interface StripeFormProps {
  stripe: any;
  elements: any;
  onClose: () => void;
  successOrder: () => void;
}

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

interface Product {
  slug: string;
  image: string;
  name: string;
  brand: string;
  price: number;
}

export interface ProductItemProps {
  product: Product;
  addToCartHandler: (product: Product) => void;
}

export interface StripeProps {
  onClose: () => void;
  successOrder: () => void;
}

export interface CustomPageProps {
  auth: boolean;
}

export interface OrderItem {
  _id: string;
  slug: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ProductProps {
  _id: string;
  name: string;
  category: string;
  brand: string;
  rating: number;
  numReviwes: number;
  description: string;
  image: string;
  price: number;
  countInStock: number;
  slug: string;
}

export interface MyAppProps { 
  Component: any;
  pageProps: any;
}

export interface CartItemProps {
  _id: string;
  slug: string;
  image: string;
  name: string;
  quantity: number;
  countInStock: number;
  price: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface OrderProps {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt?: string;
}

export interface OrderStateProps {
  loading: boolean;
  error: string;
  orders: OrderProps[];
}

export interface ProfileFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormValuesType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ShippingFormDataProps {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ProfileFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


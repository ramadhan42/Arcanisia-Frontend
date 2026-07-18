export type ValidationErrors = Record<string, string[]>;

export interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: PaginationMeta;
  links?: Record<string, string | null>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  slug: string;
  sku: string;
  image: string | null;
  top_title: string | null;
  name: string;
  description: string | null;
  scent_notes: string[] | null;
  bg_color: string | null;
  size: string | null;
  price: string;
  stock: number;
  is_active: boolean;
  badge: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  cart_id?: number;
  product_id?: number;
  quantity: number;
  unit_price?: string;
  subtotal: string;
  line_total?: string;
  product: Product;
}

export interface Cart {
  id: number;
  items: CartItem[];
  items_count: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "completed"
  | "cancelled";
export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled";
export type PaymentMethod = "bank_transfer" | "qris" | "card";

export interface Payment {
  id: number;
  order_id: number;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: string;
  reference: string | null;
  notes: string | null;
  paid_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  product_sku: string;
  product_image: string | null;
  product_size: string | null;
  unit_price: string;
  quantity: number;
  subtotal: string;
  product?: Product | null;
}

export interface Order {
  id: number;
  order_number: string;
  source: "cart" | "buy_now";
  user_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  payment_method: PaymentMethod;
  status: OrderStatus;
  subtotal: string;
  total: string;
  ordered_at: string;
  stock_restored_at: string | null;
  items: OrderItem[];
  payment: Payment | null;
  created_at: string;
  updated_at: string;
}

export interface CheckoutPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  payment_method: PaymentMethod;
}

export interface BuyNowPayload extends CheckoutPayload {
  product_id: number;
  quantity: number;
}

export type SiteContentKey =
  | "hero"
  | "rekindling"
  | "about"
  | "collection"
  | "missions"
  | "values"
  | "islands"
  | "faq"
  | "newsletter"
  | "contact"
  | "footer"
  | "legal"
  | "checkout";

export type ContentPayload = Record<string, unknown>;
export type SiteContent = Partial<Record<SiteContentKey, ContentPayload>>;

export interface LegalDocument {
  slug: string;
  title: string;
  content?: string;
  sections?: Array<{ heading?: string; body: string }>;
}

export interface LegalContent extends ContentPayload {
  links?: Array<{ label: string; slug?: string; href?: string }>;
  pages?: LegalDocument[];
  documents?: LegalDocument[];
}

export interface SiteContentRecord {
  key: SiteContentKey;
  payload: ContentPayload;
  is_active: boolean;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed_at: string;
  created_at: string;
}

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
export type PaymentMethod = "bank_transfer" | "qris" | "card" | "cod" | "midtrans" | "xendit";
export type PaymentProvider = "manual" | "midtrans" | "xendit";
export type GatewayPaymentMethod = "bank_transfer" | "qris" | "card";

export interface PaymentSettingsMidtransPublic {
  client_key: string | null;
  is_production: boolean;
  enabled_methods: GatewayPaymentMethod[];
}

export interface PaymentSettingsXenditPublic {
  is_production: boolean;
  enabled_methods: GatewayPaymentMethod[];
}

export interface PaymentSettingsPublic {
  provider: PaymentProvider;
  configured: boolean;
  available_methods: PaymentMethod[];
  midtrans?: PaymentSettingsMidtransPublic;
  xendit?: PaymentSettingsXenditPublic;
}

export interface PaymentSettingsMidtransAdmin {
  is_production: boolean;
  merchant_id: string | null;
  client_key: string | null;
  server_key: string | null;
  has_server_key: boolean;
  enabled_methods: GatewayPaymentMethod[];
  configured: boolean;
}

export interface PaymentSettingsXenditAdmin {
  is_production: boolean;
  merchant_id: string | null;
  callback_token: string | null;
  has_callback_token: boolean;
  secret_key: string | null;
  has_secret_key: boolean;
  enabled_methods: GatewayPaymentMethod[];
  configured: boolean;
}

export interface PaymentSettingsAdmin {
  provider: PaymentProvider;
  configured: boolean;
  available_methods: PaymentMethod[];
  midtrans: PaymentSettingsMidtransAdmin;
  xendit: PaymentSettingsXenditAdmin;
  updated_by: number | null;
  updated_at: string | null;
}

export interface PaymentSettingsUpdatePayload {
  provider?: PaymentProvider;
  midtrans?: {
    is_production?: boolean;
    merchant_id?: string | null;
    client_key?: string | null;
    server_key?: string;
    enabled_methods?: GatewayPaymentMethod[];
  };
  xendit?: {
    is_production?: boolean;
    merchant_id?: string | null;
    callback_token?: string;
    secret_key?: string;
    enabled_methods?: GatewayPaymentMethod[];
  };
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

export interface PaymentOrderSummary {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  payment_method?: PaymentMethod;
  status: OrderStatus;
  subtotal?: string;
  total?: string;
  ordered_at?: string;
  items?: OrderItem[];
}

export interface Payment {
  id: number;
  order_id: number;
  method: PaymentMethod;
  gateway?: PaymentProvider | null;
  snap_token?: string | null;
  checkout_url?: string | null;
  bank?: string | null;
  va_number?: string | null;
  qr_string?: string | null;
  qr_url?: string | null;
  expiry_time?: string | null;
  gateway_transaction_id?: string | null;
  status: PaymentStatus;
  amount: string;
  reference: string | null;
  notes: string | null;
  paid_at: string | null;
  expires_at: string | null;
  order?: PaymentOrderSummary | null;
  created_at: string;
  updated_at: string;
}

export interface MidtransPaymentInstructions {
  payment_type?: string | null;
  bank?: string | null;
  va_number?: string | null;
  qr_string?: string | null;
  qr_url?: string | null;
  transaction_status?: string | null;
  expiry_time?: string | null;
}

export interface OrderMidtransMeta {
  client_key: string | null;
  is_production: boolean;
  enabled_methods?: GatewayPaymentMethod[];
  instructions?: MidtransPaymentInstructions | null;
}

export interface OrderXenditMeta {
  is_production: boolean;
  external_id?: string;
  reference_id?: string;
  invoice_url: string | null;
  instructions?: MidtransPaymentInstructions | null;
}

export interface Order {
  id: number;
  order_number: string;
  source: "cart" | "buy_now";
  user_id: number | null;
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
  midtrans?: OrderMidtransMeta | null;
  xendit?: OrderXenditMeta | null;
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
  payment_bank?:
    | "bca"
    | "bni"
    | "bri"
    | "permata"
    | "mandiri"
    | "bsi"
    | "cimb"
    | "bjb"
    | "bnc"
    | "muamalat";
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
  locale?: "id" | "en";
  payload: ContentPayload;
  is_active: boolean;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed_at?: string;
  created_at: string;
}

export interface DashboardSalesPoint {
  date: string;
  label: string;
  orders_count: number;
  order_revenue: string;
  paid_revenue: string;
}

export interface DashboardSummary {
  users_count: number;
  products_count: number;
  active_products_count: number;
  orders_count: number;
  pending_orders_count: number;
  paid_revenue: string;
  pending_payments_count: number;
  subscribers_count: number;
  sales_series: DashboardSalesPoint[];
  orders_by_status: Record<string, number>;
  payments_by_status: Record<string, number>;
  recent_users: User[];
  recent_payments: Payment[];
  recent_subscribers: NewsletterSubscriber[];
}

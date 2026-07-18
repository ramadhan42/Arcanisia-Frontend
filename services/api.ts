import { apiRequest, resolveAssetUrl } from "@/lib/api";
import type {
  ApiEnvelope,
  BuyNowPayload,
  Cart,
  CheckoutPayload,
  NewsletterSubscriber,
  Order,
  PaginatedResponse,
  Payment,
  Product,
  SiteContent,
  SiteContentKey,
  SiteContentRecord,
  User,
} from "@/types/api";

const query = (values: Record<string, string | number | undefined>) => {
  const parameters = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== "") parameters.set(key, String(value));
  });
  const value = parameters.toString();
  return value ? `?${value}` : "";
};

const normalizeProduct = (product: Product): Product => ({
  ...product,
  image: resolveAssetUrl(product.image),
});

const normalizeCart = (cart: Cart): Cart => ({
  ...cart,
  items: cart.items.map((item) => ({
    ...item,
    product: normalizeProduct(item.product),
  })),
});

const normalizeOrder = (order: Order): Order => ({
  ...order,
  items: order.items.map((item) => ({
    ...item,
    product_image: resolveAssetUrl(item.product_image),
  })),
});

export const productService = {
  list: async (parameters: { page?: number; per_page?: number; search?: string } = {}) => {
    const response = await apiRequest<PaginatedResponse<Product>>(`products${query(parameters)}`);
    return { ...response, data: response.data.map(normalizeProduct) };
  },
  show: async (idOrSlug: number | string) => {
    const response = await apiRequest<ApiEnvelope<Product>>(`products/${idOrSlug}`);
    return { ...response, data: normalizeProduct(response.data) };
  },
};

export const cartService = {
  get: async (token: string) => {
    const response = await apiRequest<ApiEnvelope<Cart>>("cart", { token });
    return { ...response, data: normalizeCart(response.data) };
  },
  add: async (token: string, productId: number, quantity: number) => {
    const response = await apiRequest<ApiEnvelope<Cart>>("cart/items", {
      method: "POST",
      token,
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    return { ...response, data: normalizeCart(response.data) };
  },
  update: async (token: string, itemId: number, quantity: number) => {
    const response = await apiRequest<ApiEnvelope<Cart>>(`cart/items/${itemId}`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ quantity }),
    });
    return { ...response, data: normalizeCart(response.data) };
  },
  remove: (token: string, itemId: number) =>
    apiRequest<ApiEnvelope<null>>(`cart/items/${itemId}`, {
      method: "DELETE",
      token,
    }),
  clear: (token: string) =>
    apiRequest<ApiEnvelope<null>>("cart", { method: "DELETE", token }),
};

export const orderService = {
  list: async (
    token: string,
    parameters: { page?: number; per_page?: number; status?: string } = {},
  ) => {
    const response = await apiRequest<PaginatedResponse<Order>>(`orders${query(parameters)}`, { token });
    return { ...response, data: response.data.map(normalizeOrder) };
  },
  show: async (token: string, id: number) => {
    const response = await apiRequest<ApiEnvelope<Order>>(`orders/${id}`, { token });
    return { ...response, data: normalizeOrder(response.data) };
  },
  checkout: async (token: string, payload: CheckoutPayload, idempotencyKey: string) => {
    const response = await apiRequest<ApiEnvelope<Order>>("orders/checkout", {
      method: "POST",
      token,
      headers: { "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload),
    });
    return { ...response, data: normalizeOrder(response.data) };
  },
  buyNow: async (token: string, payload: BuyNowPayload, idempotencyKey: string) => {
    const response = await apiRequest<ApiEnvelope<Order>>("orders/buy-now", {
      method: "POST",
      token,
      headers: { "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload),
    });
    return { ...response, data: normalizeOrder(response.data) };
  },
};

export const profileService = {
  update: (token: string, payload: Record<string, unknown>) =>
    apiRequest<ApiEnvelope<User>>("me", {
      method: "PATCH",
      token,
      body: JSON.stringify(payload),
    }),
  remove: (token: string, currentPassword: string) =>
    apiRequest<ApiEnvelope<null>>("me", {
      method: "DELETE",
      token,
      body: JSON.stringify({ current_password: currentPassword }),
    }),
};

export const newsletterService = {
  subscribe: (email: string) =>
    apiRequest<ApiEnvelope<NewsletterSubscriber>>("newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

function normalizeSiteContent(
  payload:
    | SiteContent
    | SiteContentRecord[]
    | { sections?: SiteContentRecord[] },
): SiteContent {
  if (Array.isArray(payload)) {
    return Object.fromEntries(
      payload.filter((item) => item.is_active).map((item) => [item.key, item.payload]),
    ) as SiteContent;
  }
  if ("sections" in payload && Array.isArray(payload.sections)) {
    return normalizeSiteContent(payload.sections);
  }
  return payload as SiteContent;
}

export const siteContentService = {
  get: async () => {
    const response = await apiRequest<
      ApiEnvelope<SiteContent | SiteContentRecord[] | { sections?: SiteContentRecord[] }>
    >("site-content");
    return normalizeSiteContent(response.data);
  },
};

export const adminService = {
  list: <T>(
    resource: string,
    token: string,
    parameters: Record<string, string | number | undefined> = {},
  ) =>
    apiRequest<PaginatedResponse<T>>(
      `admin/${resource}${query(parameters)}`,
      { token },
    ),
  create: <T>(
    resource: string,
    token: string,
    payload: Record<string, unknown> | FormData,
  ) =>
    apiRequest<ApiEnvelope<T>>(`admin/${resource}`, {
      method: "POST",
      token,
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    }),
  update: <T>(
    resource: string,
    id: number | string,
    token: string,
    payload: Record<string, unknown> | FormData,
  ) => {
    if (payload instanceof FormData) payload.set("_method", "PATCH");
    return apiRequest<ApiEnvelope<T>>(`admin/${resource}/${id}`, {
      method: payload instanceof FormData ? "POST" : "PATCH",
      token,
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    });
  },
  remove: (resource: string, id: number | string, token: string) =>
    apiRequest<ApiEnvelope<null>>(`admin/${resource}/${id}`, {
      method: "DELETE",
      token,
    }),
  updateStatus: <T>(
    resource: "orders" | "payments",
    id: number,
    token: string,
    status: string,
  ) =>
    apiRequest<ApiEnvelope<T>>(`admin/${resource}/${id}/status`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status }),
    }),
  getContent: (token: string, key: SiteContentKey) =>
    apiRequest<ApiEnvelope<SiteContentRecord>>(
      `admin/site-content/${key}`,
      { token },
    ),
  updateContent: (
    token: string,
    key: SiteContentKey,
    payload: Record<string, unknown>,
  ) =>
    apiRequest<ApiEnvelope<SiteContentRecord>>(
      `admin/site-content/${key}`,
      {
        method: "PATCH",
        token,
        body: JSON.stringify({ payload, is_active: true }),
      },
    ),
  exportSubscribers: (token: string) =>
    apiRequest<{ data?: NewsletterSubscriber[] }>(
      "admin/newsletter-subscribers/export",
      { token },
    ),
};

export type AdminResourceRecord =
  | User
  | Product
  | Order
  | Payment
  | NewsletterSubscriber;

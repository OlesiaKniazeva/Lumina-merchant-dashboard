export type Advertisement = {
  /* Unique identifier. */
  id: string;
  /* Name. */
  name: string;
  /* Description. */
  description?: string;
  /* Price. */
  price: number;
  /* Creation date and time. */
  createdAt: string;
  /* Number of views. */
  views: number;
  /* Number of likes. */
  likes: number;
  /* Image URL. */
  imageUrl?: string;
};

// Export as both type and value
export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const;

// Type for OrderStatus values
export type OrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

export type OrderItem = Advertisement & { count: number };

export type Order = {
  /* Unique identifier. */
  id: string;
  /* Status. */
  status: OrderStatusValue;
  /* Creation date and time. */
  createdAt: string;
  /* Completion date and time. */
  finishedAt?: string;
  /* Items in the order. */
  items: Array<OrderItem>;
  /* Delivery method (Post, CDEK...) */
  deliveryWay: string;
  /* Order total amount */
  total: number;
};

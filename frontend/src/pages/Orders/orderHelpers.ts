import { OrderStatus } from '@/types';

export const getStatusLabel = (status: number) => {
  switch (status) {
    case OrderStatus.Created:
      return 'Created';
    case OrderStatus.Paid:
      return 'Paid';
    case OrderStatus.Transport:
      return 'In Transit';
    case OrderStatus.DeliveredToThePoint:
      return 'Delivered to Point';
    case OrderStatus.Received:
      return 'Received';
    case OrderStatus.Archived:
      return 'Archived';
    case OrderStatus.Refund:
      return 'Refunded';
    default:
      return 'Unknown';
  }
};

export const getStatusColor = (
  status: number,
): 'default' | 'primary' | 'success' | 'error' | 'info' | 'warning' => {
  switch (status) {
    case OrderStatus.Created:
      return 'default';
    case OrderStatus.Paid:
      return 'info';
    case OrderStatus.Transport:
      return 'warning';
    case OrderStatus.DeliveredToThePoint:
      return 'info';
    case OrderStatus.Received:
      return 'success';
    case OrderStatus.Archived:
      return 'default';
    case OrderStatus.Refund:
      return 'error';
    default:
      return 'default';
  }
};

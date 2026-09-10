import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockOrders } from '../data/orders';

const OrderContext = createContext();

const STORAGE_KEY = 'alkabeer_orders_list';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockOrders;
    } catch {
      return mockOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore storage error
    }
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        String(order.id).trim() === String(orderId).trim()
          ? {
              ...order,
              status: 'Cancelled',
              statusType: 'history',
              cancelledAt: new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : order
      )
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (String(order.id).trim() === String(orderId).trim()) {
          const isHistory = newStatus === 'Delivered' || newStatus === 'Cancelled';
          const nowStr = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            ...order,
            status: newStatus,
            statusType: isHistory ? 'history' : 'active',
            ...(newStatus === 'Delivered' ? { deliveredAt: `Updated, ${nowStr}` } : {}),
            ...(newStatus === 'Cancelled' ? { cancelledAt: `Cancelled, ${nowStr}` } : {}),
          };
        }
        return order;
      })
    );
  };

  const getOrder = (orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        cancelOrder,
        updateOrderStatus,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

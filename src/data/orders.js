export const mockOrders = [
  {
    id: 'AKM-98421',
    date: 'Today, 06:15 PM',
    status: 'Out for Delivery',
    statusType: 'active',
    estimatedDelivery: '10–15 mins',
    items: [
      {
        id: 1,
        name: 'Amul Taaza Toned Fresh Milk',
        weight: '500 ml',
        price: 27,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 3,
        name: 'Britannia 100% Whole Wheat Bread',
        weight: '400 g',
        price: 50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 4,
        name: 'Farm Fresh White Eggs',
        weight: '6 pcs',
        price: 42,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cb6?auto=format&fit=crop&q=80&w=200'
      }
    ],
    deliveryFee: 0,
    total: 146,
    deliveryAddress: 'Sarkarpara More, Bhagabatipur, Hooghly - 712701',
    rider: 'Rahul Karmakar (Express Rider)',
    riderPhone: '+91 9002461519'
  },
  {
    id: 'AKM-97650',
    date: 'Yesterday, 04:30 PM',
    status: 'Delivered',
    statusType: 'history',
    deliveredAt: 'Yesterday, 04:44 PM (in 14 mins)',
    items: [
      {
        id: 16,
        name: 'Aashirvaad Superior MP Atta',
        weight: '5 kg',
        price: 230,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 19,
        name: 'Fortune Premium Kachi Ghani Mustard Oil',
        weight: '1 L',
        price: 145,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 9,
        name: "Lays India's Magic Masala Chips",
        weight: '50 g',
        price: 20,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=200'
      }
    ],
    deliveryFee: 10,
    total: 445,
    deliveryAddress: 'Mollar Chawk, Nawabpur, Chanditala, Hooghly',
    rider: 'Subrata Das (Bhagabatipur Hub)',
    riderPhone: '+91 9635066178'
  },
  {
    id: 'AKM-95211',
    date: '02 Sep 2026, 09:10 AM',
    status: 'Delivered',
    statusType: 'history',
    deliveredAt: '02 Sep 2026, 09:22 AM (in 12 mins)',
    items: [
      {
        id: 2,
        name: 'Amul Butter - Pasteurized',
        weight: '100 g',
        price: 58,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 13,
        name: 'Cadbury Dairy Milk Silk Chocolate',
        weight: '150 g',
        price: 80,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=200'
      }
    ],
    deliveryFee: 0,
    total: 218,
    deliveryAddress: 'Bhagabatipur Rajar Road, Hooghly',
    rider: 'Tanmoy Sen',
    riderPhone: '+91 9002461519'
  }
];

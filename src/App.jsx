import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { Header, CategoryNav, Footer, MobileBottomNav } from './components/layout';
import { VipModal } from './components/modals';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';

// Scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVipOpen, setIsVipOpen] = useState(false);
  const location = useLocation();

  const hideCategoryNav = ['/orders', '/cart', '/account', '/login', '/checkout'].some(
    (path) => location.pathname === path || location.pathname.startsWith(path + '/')
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-primary-light selection:text-primary w-full max-w-full">
      <ScrollToTop />

      {/* Fixed Sticky Header & Dynamic Category Navigation Suite */}
      <div className="sticky top-0 z-40 w-full bg-surface shadow-subtle">
        <Header
          onOpenVip={() => setIsVipOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {!hideCategoryNav && <CategoryNav />}
      </div>

      {/* Main Routed Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenVip={() => setIsVipOpen(true)}
              />
            }
          />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/account" element={<Account onOpenVip={() => setIsVipOpen(true)} />} />
          <Route path="/cart" element={<Cart onOpenVip={() => setIsVipOpen(true)} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Navigate to="/account?tab=orders" replace />} />
          {/* Catch-all fallback route */}
          <Route
            path="*"
            element={
              <Home
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenVip={() => setIsVipOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* Redesigned Light Modern Footer */}
      <Footer onOpenVip={() => setIsVipOpen(true)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* VIP Modal */}
      <VipModal isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <MainLayout />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

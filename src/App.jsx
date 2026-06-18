import React from 'react';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import ComboSection from './components/ComboSection';
import AboutSection from './components/AboutSection';
import BestSellerSection from './components/BestSellerSection';
import CartPage from './components/CartPage';
import AuthBottomSheet from './components/AuthBottomSheet';
import SideMenu from './components/SideMenu';
import AccountPage from './components/AccountPage';
import OrdersPage from './components/OrdersPage';
import MenuPage from './components/MenuPage';
import AboutUsPage from './components/AboutUsPage';
import CateringSection from './components/CateringSection';
import CateringFormPage from './components/CateringFormPage';

function App() {
  const [activeCategory, setActiveCategory] = React.useState('burger');
  const [cartItems, setCartItems] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('cartItems')) || []; } catch(e) { return []; }
  });
  const [currentPage, setCurrentPage] = React.useState('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('isLoggedIn')) || false; } catch(e) { return false; }
  });
  const [userPhone, setUserPhone] = React.useState(() => localStorage.getItem('userPhone') || '');
  const [userName, setUserName] = React.useState(() => localStorage.getItem('userName') || '');
  const [userAddress, setUserAddress] = React.useState(() => localStorage.getItem('userAddress') || '');
  const [isProfileSaved, setIsProfileSaved] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('isProfileSaved')) || false; } catch(e) { return false; }
  });
  const [showAuthSheet, setShowAuthSheet] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const [usersDb, setUsersDb] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('usersDb')) || {}; } catch(e) { return {}; }
  });
  
  const [allOrders, setAllOrders] = React.useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('allOrders'));
      if (stored && stored.length > 0) return stored;
    } catch(e) {}
    return [];
  });

  const [cateringRequests, setCateringRequests] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('cateringRequests')) || []; } catch(e) { return []; }
  });

  React.useEffect(() => {
    if (isLoggedIn && userPhone && isProfileSaved) {
      setUsersDb(prev => ({
        ...prev,
        [userPhone]: { name: userName, address: userAddress }
      }));
    }
  }, [isLoggedIn, userPhone, userName, userAddress, isProfileSaved]);

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userPhone', userPhone);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userAddress', userAddress);
    localStorage.setItem('isProfileSaved', JSON.stringify(isProfileSaved));
  }, [cartItems, isLoggedIn, userPhone, userName, userAddress, isProfileSaved]);

  React.useEffect(() => {
    localStorage.setItem('usersDb', JSON.stringify(usersDb));
  }, [usersDb]);

  React.useEffect(() => {
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
  }, [allOrders]);

  React.useEffect(() => {
    localStorage.setItem('cateringRequests', JSON.stringify(cateringRequests));
  }, [cateringRequests]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    setUserName('');
    setUserAddress('');
    setIsProfileSaved(false);
    setCartItems([]);
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('isProfileSaved');
    localStorage.removeItem('cartItems');
    
    setCurrentPage('home');
  };

  const handlePlaceOrder = (orderDetails) => {
    const orderWithPhone = { ...orderDetails, phone: userPhone };
    setAllOrders([orderWithPhone, ...allOrders]);
    setCartItems([]);
    setCurrentPage('orders');
  };

  const handleUpdateQuantity = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (quantity <= 0) {
        return prev.filter(item => item.id !== product.id);
      }
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Background canvas for desktop layout */}
      <div className="desktop-bg-pattern"></div>

      {/* Premium device frame container */}
      <div className="device-frame">
        <div className="device-screen">
          
          {/* Fixed mobile header */}
          <Header 
            cartItemCount={totalCartItems} 
            onCartClick={() => setCurrentPage('cart')} 
            onMenuClick={() => setIsMenuOpen(true)}
            onBackClick={() => setCurrentPage('home')}
            showBack={currentPage !== 'home'}
          />

          {/* Viewport rendering main content */}
          <div className="content-viewport">
            <main className="main-content">
              {currentPage === 'home' && (
                <>
                  <BannerSlider onNavigate={setCurrentPage} />
                  <CategoryList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                  <ProductList activeCategory={activeCategory} getQuantity={getQuantity} onUpdateQuantity={handleUpdateQuantity} />
                  <ComboSection getQuantity={getQuantity} onUpdateQuantity={handleUpdateQuantity} />
                  <AboutSection />
                  <BestSellerSection getQuantity={getQuantity} onUpdateQuantity={handleUpdateQuantity} />
                  <CateringSection onNavigate={setCurrentPage} />
                </>
              )}
              
              {currentPage === 'cart' && (
                <CartPage 
                  cartItems={cartItems} 
                  getQuantity={getQuantity} 
                  onUpdateQuantity={handleUpdateQuantity} 
                  totalPrice={totalCartPrice}
                  isLoggedIn={isLoggedIn}
                  userPhone={userPhone}
                  onTriggerAuth={() => setShowAuthSheet(true)}
                  onCheckout={(finalAmount, orderType) => {
                    const newOrder = {
                      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
                      date: new Date().toLocaleString(),
                      type: orderType,
                      items: [...cartItems],
                      totalAmount: finalAmount || totalCartPrice,
                      status: 'Pending',
                      billUrl: null
                    };
                    handlePlaceOrder(newOrder);
                  }}
                />
              )}

              {currentPage === 'account' && (
                <AccountPage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  userName={userName}
                  setUserName={setUserName}
                  userAddress={userAddress}
                  setUserAddress={setUserAddress}
                  isProfileSaved={isProfileSaved}
                  setIsProfileSaved={setIsProfileSaved}
                  onLogin={() => setShowAuthSheet(true)} 
                  onLogout={handleLogout}
                />
              )}

              {currentPage === 'orders' && (
                <OrdersPage orders={allOrders.filter(order => order.phone === userPhone)} />
              )}

              {currentPage === 'menu' && (
                <MenuPage 
                  getQuantity={getQuantity} 
                  onUpdateQuantity={handleUpdateQuantity} 
                />
              )}

              {currentPage === 'about' && (
                <AboutUsPage />
              )}

              {currentPage === 'cateringForm' && (
                <CateringFormPage 
                  isLoggedIn={isLoggedIn}
                  userPhone={userPhone}
                  userName={userName}
                  onTriggerAuth={() => setShowAuthSheet(true)}
                  onSubmitRequest={(request) => {
                    setCateringRequests([request, ...cateringRequests]);
                  }}
                />
              )}
            </main>
          </div>

          <SideMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            onNavigate={(page) => {
              setCurrentPage(page);
              setIsMenuOpen(false);
            }} 
          />

          <AuthBottomSheet 
            isOpen={showAuthSheet} 
            onClose={() => setShowAuthSheet(false)}
            onLoginSuccess={(phone) => {
              setIsLoggedIn(true);
              setUserPhone(phone);
              setShowAuthSheet(false);
              
              if (usersDb[phone]) {
                setUserName(usersDb[phone].name);
                setUserAddress(usersDb[phone].address);
                setIsProfileSaved(true);
              } else {
                setUserName('');
                setUserAddress('');
                setIsProfileSaved(false);
              }
            }}
          />

          {/* iOS swipe Home Indicator Bar */}
          <div className="home-indicator"></div>
        </div>
      </div>
    </>
  );
}

export default App;


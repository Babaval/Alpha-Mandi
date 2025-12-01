import React, { useState, useEffect } from "react";
import { ViewState, MenuItem, CartItem, UserProfile } from "./types";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Menu } from "./components/Menu";
import { CartSidebar } from "./components/CartSidebar";
import { AIConcierge } from "./components/AIConcierge";
import { Footer } from "./components/Footer";
import {
  OffersSection,
  TrustSection,
  ReviewsSection,
  PartnersSection,
} from "./components/HomeSections";
import { AuthModal } from "./components/AuthModal";
import { Checkout } from "./components/Checkout";
import { SplashScreen } from "./components/SplashScreen";
import { Profile } from "./components/Profile";
import { CateringSection, CateringModal } from "./components/Catering";
import { TestingSuite } from "./components/TestingSuite";
import { MOCK_PAST_ORDERS } from "./constants";
import { Reservations } from "./components/Reservations";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>("HOME");

  // When user tries to go somewhere that requires auth while logged out,
  // we remember it here and send them there after login.
  const [pendingView, setPendingView] = useState<ViewState | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Catering State
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false);

  // Splash finish → detect mobile and maybe force auth
  const handleSplashFinish = () => {
    setShowSplash(false);

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (mobile && !user?.isLoggedIn) {
      setIsAuthModalOpen(true);
    }
  };

  // Handle resize → keep "mobile" flag updated, and on mobile force auth if needed
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!showSplash && mobile && !user?.isLoggedIn) {
        setIsAuthModalOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user, showSplash]);

  // ---------------- CART LOGIC ----------------
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ---------------- AUTH-GATED NAV HELPERS ----------------

  // Go to RESERVATIONS, but if logged out → open auth and remember target
  const goToReservations = () => {
    if (!user?.isLoggedIn) {
      setPendingView("RESERVATIONS");
      setIsAuthModalOpen(true);
    } else {
      setCurrentView("RESERVATIONS");
    }
  };

  // Checkout Handler with auth gating
  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    if (!user?.isLoggedIn) {
      setPendingView("CHECKOUT");
      setIsAuthModalOpen(true);
    } else {
      setCurrentView("CHECKOUT");
    }
  };

  // When AuthModal says “login/signup successful”
  const handleLogin = (newUser: UserProfile) => {
    // Enrich with mock data for demo purposes
    const defaultAvatar =
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80";

    const enrichedUser: UserProfile = {
      ...newUser,
      isLoggedIn: true,
      tier: newUser.tier ?? "Gold",
      points: newUser.points ?? 2450,
      orders: newUser.orders ?? MOCK_PAST_ORDERS,
      avatar: newUser.avatar ?? defaultAvatar,
      avatarUrl: newUser.avatarUrl ?? defaultAvatar,
      avatarMode: newUser.avatarMode ?? "photo",
    };

    setUser(enrichedUser);
    setIsAuthModalOpen(false);

    // If user was trying to go somewhere protected (checkout / reservations),
    // send them there now.
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ---------------- MAIN VIEW SWITCH ----------------
  const renderView = () => {
    switch (currentView) {
      case "HOME":
        return (
          <>
            <Hero
              onOrderNow={() => setCurrentView("MENU")}
              onReserveNow={goToReservations} // 🔑 hook hero "Reserve Table" button
            />
            <OffersSection />
            <Menu addToCart={addToCart} />
            <CateringSection
              onOpenRequest={() => setIsCateringModalOpen(true)}
            />
            <TrustSection />
            <ReviewsSection />
            <PartnersSection />
          </>
        );

      case "MENU":
        return <Menu addToCart={addToCart} />;

      case "CHECKOUT":
        return user ? (
          <Checkout
            cart={cart}
            user={user}
            onSuccess={() => {
              setCart([]);
              setCurrentView("HOME");
            }}
            onCancel={() => setCurrentView("HOME")}
          />
        ) : (
          // Fallback safety – should rarely happen because of gating
          <Hero
            onOrderNow={() => setCurrentView("MENU")}
            onReserveNow={goToReservations}
          />
        );

      case "PROFILE":
        return user ? (
          <Profile
            user={user}
            onLogout={() => {
              setUser(null);
              setCart([]);
              setCurrentView("HOME");
            }}
            onBackHome={() => setCurrentView("MENU")}
            // keep App + Navigation in sync when user edits avatar/name
            onUpdateUser={(updated) => setUser(updated)}
          />
        ) : (
          <Hero
            onOrderNow={() => setCurrentView("MENU")}
            onReserveNow={goToReservations}
          />
        );

      case "RESERVATIONS":
        return user ? (
          <Reservations
            user={user}
            onSuccess={() => setCurrentView("HOME")}
            onCancel={() => setCurrentView("HOME")}
          />
        ) : (
          // Safety: if someone somehow hits this without login
          <Hero
            onOrderNow={() => setCurrentView("MENU")}
            onReserveNow={goToReservations}
          />
        );

      case "TESTING":
        return <TestingSuite />;

      default:
        return (
          <Hero
            onOrderNow={() => setCurrentView("MENU")}
            onReserveNow={goToReservations}
          />
        );
    }
  };

  // ---------------- RENDER ROOT ----------------
  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {!showSplash && (
        <div className="min-h-screen bg-surface text-gray-100 selection:bg-primary selection:text-black font-sans flex flex-col">
          <Navigation
            currentView={currentView}
            setView={(view) => {
              // Intercept RESERVATIONS from navbar so we can apply auth gating
              if (view === "RESERVATIONS") {
                goToReservations();
              } else {
                setCurrentView(view);
              }
            }}
            cartCount={cartCount}
            toggleCart={() => setIsCartOpen(true)}
            user={user}
            onLoginClick={() => setIsAuthModalOpen(true)}
          />

          <main className="flex-grow">{renderView()}</main>

          <Footer onDevClick={() => setCurrentView("TESTING")} />

          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onCheckout={handleCheckoutStart}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onLogin={handleLogin}
            onClose={() => !isMobile && setIsAuthModalOpen(false)} // Mobile can't close without login
            isMobile={isMobile}
          />

          <CateringModal
            isOpen={isCateringModalOpen}
            onClose={() => setIsCateringModalOpen(false)}
          />

          <AIConcierge />
        </div>
      )}
    </>
  );
};

export default App;

import React, { useState } from "react";
import { CartItem, UserProfile } from "../types";
import {
  createOrder,
  logPayment,
  type OrderItem,
} from "../services/backendService";
import { sendOrderConfirmationEmail } from "../services/emailService";

import { CreditCard, Truck, CheckCircle, Loader2 } from "lucide-react";

interface CheckoutProps {
  cart: CartItem[];
  user: UserProfile;
  onSuccess: () => void;
  onCancel: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cart,
  user,
  onSuccess,
  onCancel,
}) => {
  const [step, setStep] = useState<
    "DETAILS" | "PAYMENT" | "PROCESSING" | "DONE"
  >("DETAILS");
  const [address, setAddress] = useState("");

  // money calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    if (!address) return;

    setStep("PROCESSING");

    try {
      // 1️⃣ Build OrderItem[] from cart
      const items: OrderItem[] = cart.map((item) => ({
        menuItemId: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      // 2️⃣ Store order in Firestore
      const orderId = await createOrder({
        items,
        subtotal,
        deliveryFee,
        total,
        address,
        status: "PENDING",
        user: {
          email: user.email,
          name: user.name,
          userId: user.email,
        },
      });

      // 3️⃣ Log payment success (simulated)
      await logPayment({
        orderId,
        amount: total,
        currency: "USD",
        method: "CARD",
        status: "SUCCESS",
        gatewayRef: "SIMULATED-GATEWAY-OK",
        user: {
          email: user.email,
          name: user.name,
          userId: user.email,
        },
      });

      // 4️⃣ Send order confirmation email (non-blocking for user)
      try {
        await sendOrderConfirmationEmail({
          toName: user.name,
          toEmail: user.email,
          orderId,
          total,
        });
      } catch (emailErr) {
        console.error("Failed to send confirmation email:", emailErr);
        // We don't block the user for email failure – just log it
      }

      // 5️⃣ Show success screen
      setStep("DONE");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong while placing your order. Please try again.");
      setStep("PAYMENT");
    }
  };

  if (step === "DONE") {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-surface">
        <div className="bg-surface-light p-8 rounded-2xl border border-primary/20 max-w-md w-full text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
            <CheckCircle size={40} className="text-primary" />
          </div>

          <h2 className="text-3xl font-serif text-white mb-2">
            Order Confirmed
          </h2>

          <p className="text-gray-400 mb-4 font-light">
            Thank you, {user.name}. Your order has been placed successfully.
          </p>

          <p className="text-gray-500 text-xs mb-8">
            A confirmation email has been sent to{" "}
            <span className="text-primary font-medium">{user.email}</span> with
            your order details.
          </p>

          <button
            onClick={onSuccess}
            className="w-full bg-primary text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-white transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (step === "PROCESSING") {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center text-white backdrop-blur-xl">
        <Loader2 size={48} className="animate-spin text-primary mb-6" />
        <h3 className="text-2xl font-serif mb-2">Processing Payment</h3>
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          Secure Transaction in Progress
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Forms */}
        <div className="space-y-6">
          <div className="bg-surface-light p-8 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
              <Truck size={20} className="text-primary" /> Delivery Details
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-bold">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Apartment, City, Zip"
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary h-24 resize-none focus:outline-none placeholder-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-light p-8 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
              <CreditCard size={20} className="text-primary" /> Payment Method
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 mb-2">
                <button className="flex-1 bg-primary/10 border border-primary text-primary py-3 rounded text-xs font-bold uppercase tracking-wider">
                  Credit Card
                </button>
                <button className="flex-1 bg-transparent border border-white/10 text-gray-500 py-3 rounded text-xs font-bold uppercase tracking-wider hover:border-gray-400">
                  PayPal
                </button>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-bold">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-bold">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-bold">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-surface-light p-8 rounded-2xl border border-white/5 h-fit shadow-2xl sticky top-24">
          <h3 className="text-xl font-serif text-white mb-8 border-b border-white/5 pb-4">
            Order Summary
          </h3>
          <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-white/5 w-6 h-6 flex items-center justify-center rounded text-xs text-primary border border-white/10">
                    {item.quantity}
                  </span>
                  <span className="text-gray-300 font-light">
                    {item.name}
                  </span>
                </div>
                <span className="text-white font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 space-y-3 mb-8">
            <div className="flex justify-between text-gray-500 text-sm uppercase tracking-wide">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm uppercase tracking-wide">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white text-xl font-serif font-bold pt-4 border-t border-white/5 mt-4">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-4 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!address}
              className="flex-[2] bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 rounded uppercase tracking-[0.2em] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              Confirm &amp; Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

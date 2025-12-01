import React, { useState } from "react";
import { X } from "lucide-react";
import { UserProfile } from "../types";

import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthModalProps {
  isOpen: boolean;
  onLogin: (user: UserProfile) => void;
  onClose: () => void;
  isMobile: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onLogin,
  onClose,
  isMobile,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (isLogin) {
        // ---------- LOGIN WITH EMAIL + PASSWORD ----------
        const cred = await signInWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );

        const fbUser = cred.user;

        const profile: UserProfile = {
          name:
            fbUser.displayName ||
            fbUser.email?.split("@")[0] ||
            "Alpha Guest",
          email: fbUser.email || formData.email,
          phone: formData.phone, // optional, can be enriched from Firestore later
          isLoggedIn: true,
          // if your UserProfile has uid or other fields, you can add:
          // uid: fbUser.uid,
        } as UserProfile;

        onLogin(profile);

        // Optional: gentle reminder if not verified yet
        if (!fbUser.emailVerified) {
          setInfo(
            "You are logged in, but your email is not verified yet. Please check your inbox for a verification link."
          );
        } else {
          setInfo(null);
        }

        if (!isMobile) {
          onClose();
        }
      } else {
        // ---------- SIGN UP (EMAIL + PASSWORD, WITH PHONE & VERIFICATION) ----------
        if (!formData.name.trim() || !formData.phone.trim()) {
          throw new Error("Please fill in your name and phone number.");
        }

        const cred = await createUserWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );

        const fbUser = cred.user;

        // Set display name in Firebase Auth
        await updateProfile(fbUser, {
          displayName: formData.name.trim(),
        });

        // Create a Firestore profile document
        await setDoc(doc(db, "users", fbUser.uid), {
          name: formData.name.trim(),
          email: fbUser.email,
          phone: formData.phone.trim(),
          createdAt: serverTimestamp(),
          tier: "Gold", // you can change this later
          points: 0,
        });

        // Send verification email
        try {
          await sendEmailVerification(fbUser);
          setInfo(
            "Profile created! We sent a verification link to your email. Please verify to fully activate your account."
          );
        } catch (err) {
          console.warn("Failed to send verification email:", err);
          setInfo(
            "Profile created, but we couldn't send a verification email. You can request it again later from your profile."
          );
        }

        const profile: UserProfile = {
          name: formData.name.trim(),
          email: fbUser.email || formData.email,
          phone: formData.phone.trim(),
          isLoggedIn: true,
        } as UserProfile;

        onLogin(profile);

        if (!isMobile) {
          onClose();
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // Basic Firebase error mapping
      const message: string =
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered. Try signing in instead."
          : err?.code === "auth/invalid-credential" ||
            err?.code === "auth/wrong-password"
          ? "Invalid email or password."
          : err?.code === "auth/user-not-found"
          ? "No account found with this email."
          : err?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError(null);
    setInfo(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-surface-light border border-primary/20 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up relative">
        {!isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors"
          >
            <X size={24} />
          </button>
        )}

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-white mb-2">
              {isLogin ? "Welcome Back" : "Join The Club"}
            </h2>

            {isMobile && (
              <p className="text-primary text-xs mb-3 bg-primary/10 py-2 rounded border border-primary/20">
                Please sign in to access the mobile experience.
              </p>
            )}

            <div className="h-0.5 w-12 bg-primary mx-auto mb-3"></div>
            <p className="text-gray-400 text-sm font-light">
              {isLogin
                ? "Enter your email and password to access your account."
                : "Create your Alpha Mandi profile and start earning rewards."}
            </p>
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-400 bg-red-900/20 border border-red-800/40 rounded px-3 py-2">
              {error}
            </div>
          )}

          {info && (
            <div className="mb-4 text-xs text-primary bg-primary/10 border border-primary/30 rounded px-3 py-2">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* SIGN UP ONLY FIELDS */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-primary mb-1.5 font-bold">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder-gray-700"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-primary mb-1.5 font-bold">
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder-gray-700"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                  <p className="mt-1 text-[10px] text-gray-500">
                    Used for reservations & delivery updates. Login is via
                    email & password.
                  </p>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary mb-1.5 font-bold">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder-gray-700"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary mb-1.5 font-bold">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder-gray-700"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 rounded uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform mt-6 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading
                ? isLogin
                  ? "Signing In..."
                  : "Creating Profile..."
                : isLogin
                ? "Sign In"
                : "Create Profile"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/5 pt-4">
            <button
              onClick={toggleMode}
              className="text-gray-400 text-xs hover:text-primary transition-colors tracking-wide"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

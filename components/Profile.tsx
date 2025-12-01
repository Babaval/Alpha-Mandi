// components/Profile.tsx
import React, { useState, useEffect } from "react";
import { UserProfile, AvatarMode } from "../types";
import {
  Package,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  MapPin,
  Camera,
} from "lucide-react";

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  onBackHome: () => void;
  // Optional: used so App/Nav get updated avatar & name
  onUpdateUser?: (user: UserProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  onLogout,
  onBackHome,
  onUpdateUser,
}) => {
  // local copy so we can edit avatar etc.
  const [localUser, setLocalUser] = useState<UserProfile>(user);

  // which section is shown on the right side
  const [activeSection, setActiveSection] = useState<
    "OVERVIEW" | "ADDRESSES" | "SETTINGS"
  >("OVERVIEW");

  // 🔄 when parent user changes (e.g. new account logs in), sync localUser
  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const pushUpdate = (patch: Partial<UserProfile>) => {
    const next = { ...localUser, ...patch };
    setLocalUser(next);
    onUpdateUser?.(next);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file); // session-only URL; later can upload to storage
    pushUpdate({ avatarUrl: url, avatarMode: "photo" });
  };

  const handleAvatarModeChange = (mode: AvatarMode) => {
    pushUpdate({ avatarMode: mode });
  };

  const handleEmojiSelect = (emoji: string) => {
    pushUpdate({ avatarMode: "icon", avatarIcon: emoji });
  };

  const initials =
    localUser.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "";

  const renderAvatar = () => {
    if (localUser.avatarMode === "photo" && localUser.avatarUrl) {
      return (
        <img
          src={localUser.avatarUrl}
          alt={localUser.name}
          className="w-full h-full object-cover"
        />
      );
    }

    if (localUser.avatarMode === "icon" && localUser.avatarIcon) {
      return (
        <div className="w-full h-full flex items-center justify-center text-3xl">
          {localUser.avatarIcon}
        </div>
      );
    }

    // default: initials
    return (
      <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-black bg-gradient-to-br from-primary to-primary-dark">
        {initials || "AM"}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          {/* User card */}
          <div className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden group bg-surface-light">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-full p-[2px] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <div className="w-full h-full bg-surface rounded-full overflow-hidden flex items-center justify-center">
                  {renderAvatar()}
                </div>
              </div>

              <h2 className="text-2xl font-serif text-white mb-1">
                {localUser.name}
              </h2>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">
                {localUser.tier || "Gold"} Member
              </p>

              {/* Avatar controls */}
              <div className="space-y-3 mb-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Personalize Avatar
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {/* Upload photo */}
                  <label className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10">
                    <Camera size={14} />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>

                  {/* Initials mode */}
                  <button
                    type="button"
                    onClick={() => handleAvatarModeChange("initials")}
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest border ${
                      localUser.avatarMode === "initials" ||
                      !localUser.avatarMode
                        ? "bg-primary text-black border-primary"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Initials
                  </button>

                  {/* Emoji mode */}
                  <button
                    type="button"
                    onClick={() => handleAvatarModeChange("icon")}
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest border ${
                      localUser.avatarMode === "icon"
                        ? "bg-primary text-black border-primary"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Emoji
                  </button>
                </div>

                {/* Emoji options */}
                <div className="flex justify-center gap-2">
                  {["🍽️", "🥘", "🍗", "🧆"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-lg border transition-all ${
                        localUser.avatarMode === "icon" &&
                        localUser.avatarIcon === emoji
                          ? "border-primary bg-primary/20"
                          : "border-white/10 bg-white/5 hover:border-primary/60"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white mb-1">
                    {localUser.points || 0}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Points
                  </span>
                </div>
                <div className="text-center border-l border-white/5">
                  <span className="block text-2xl font-bold text-white mb-1">
                    {localUser.orders?.length || 0}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Orders
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
          </div>

          {/* Quick Actions – now switch sections */}
          <div className="glass-panel rounded-xl overflow-hidden bg-surface-light">
            <button
              className={`w-full p-4 flex items-center justify-between transition-colors border-b border-white/5 ${
                activeSection === "ADDRESSES"
                  ? "bg-white/10 text-primary"
                  : "text-gray-400 hover:bg-white/5 hover:text-primary"
              }`}
              onClick={() => setActiveSection("ADDRESSES")}
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary/70" />
                <span className="text-sm">Saved Addresses</span>
              </div>
              <ChevronRight size={16} />
            </button>

            <button
              className={`w-full p-4 flex items-center justify-between transition-colors border-b border-white/5 ${
                activeSection === "SETTINGS"
                  ? "bg-white/10 text-primary"
                  : "text-gray-400 hover:bg-white/5 hover:text-primary"
              }`}
              onClick={() => setActiveSection("SETTINGS")}
            >
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-primary/70" />
                <span className="text-sm">Account Settings</span>
              </div>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={onLogout}
              className="w-full p-4 flex items-center justify-between text-red-400 hover:bg-red-900/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span className="text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – main content, depends on activeSection */}
        <div className="lg:col-span-8 space-y-8">
          {/* Rewards card always visible */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center p-8 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a6e16] to-[#000000]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-3xl font-serif text-white font-bold mb-2">
                  Loyalty Status
                </h3>
                <p className="text-gray-300 font-light max-w-sm mb-6">
                  You are{" "}
                  <span className="text-primary font-bold">550 points</span> away
                  from upgrading to Platinum status and unlocking exclusive
                  chef&apos;s table access.
                </p>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                  <div className="h-full bg-gradient-to-r from-primary to-white w-[70%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                </div>
                <p className="text-primary text-xs mt-3 font-mono text-right tracking-widest">
                  2,450 / 3,000 PTS
                </p>
              </div>
              <div className="w-28 h-28 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-500">
                <Award size={48} className="text-primary drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Section content */}
          {activeSection === "OVERVIEW" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif text-white">Order History</h3>
                <button className="text-xs text-primary hover:text-white transition-colors uppercase tracking-widest">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {localUser.orders && localUser.orders.length > 0 ? (
                  localUser.orders.map((order) => (
                    <div
                      key={order.id}
                      className="glass-panel rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-white/5 transition-all duration-300 bg-surface-light"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-black p-3 rounded-lg text-primary border border-white/5">
                          <Package size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-white font-serif">
                              {order.id}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
                                order.status === "Delivered"
                                  ? "bg-green-900/20 text-green-400 border-green-900/30"
                                  : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-1">
                            {order.items.join(", ")}
                          </p>
                          <p className="text-gray-600 text-xs">{order.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                        <div className="text-right">
                          <span className="block text-lg font-bold text-primary font-serif">
                            ${order.total.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-gray-500 flex items-center justify-end gap-1">
                            +{order.pointsEarned} pts{" "}
                            <Star
                              size={10}
                              fill="#D4AF37"
                              className="text-primary"
                            />
                          </span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-primary hover:text-black text-gray-600 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 glass-panel rounded-xl border-dashed border-white/10">
                    <Package size={48} className="mx-auto text-gray-700 mb-4" />
                    <p className="text-gray-500">No orders placed yet.</p>
                    <button
                      onClick={onBackHome}
                      className="mt-4 text-primary hover:text-white text-sm uppercase tracking-widest"
                    >
                      Start Ordering
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "ADDRESSES" && (
            <div className="glass-panel rounded-xl p-6 bg-surface-light">
              <h3 className="text-2xl font-serif text-white mb-4">
                Saved Addresses
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                In a real build, this section would show your default delivery
                address, work/home locations, and let you add or edit them.
              </p>
              <div className="border border-dashed border-white/10 rounded-lg p-4 text-gray-500 text-sm">
                Address management is coming soon in this demo. For now, all
                orders will use the address you enter at checkout.
              </div>
            </div>
          )}

          {activeSection === "SETTINGS" && (
            <div className="glass-panel rounded-xl p-6 bg-surface-light">
              <h3 className="text-2xl font-serif text-white mb-4">
                Account Settings
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Here you could let guests update their name, email, and
                communication preferences.
              </p>
              <div className="grid gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={localUser.name}
                    onChange={(e) => pushUpdate({ name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={localUser.email}
                    onChange={(e) => pushUpdate({ email: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Small button to go back to menu/home */}
          <div className="text-right">
            <button
              onClick={onBackHome}
              className="text-xs text-gray-500 hover:text-primary uppercase tracking-[0.2em]"
            >
              ← Back to Ordering
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

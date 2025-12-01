// components/Reservations.tsx
import React, { useEffect, useState } from "react";
import { Calendar, Users, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { createReservation } from "../services/backendService";
import { UserProfile } from "../types";

interface ReservationProps {
  user: UserProfile;
  onSuccess: () => void;
  onCancel: () => void;
}

export const Reservations: React.FC<ReservationProps> = ({
  user,
  onSuccess,
  onCancel,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optional: pre-fill date with “today”
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date || !time || guests <= 0) {
      setError("Please select a date, time and number of guests.");
      return;
    }

    try {
      setLoading(true);

      const reservationId = await createReservation({
        date,
        time,
        guests,
        specialRequest,
        name: user.name,
        phone: (user as any).phone ?? "",
        user: {
          name: user.name,
          email: user.email,
          userId: user.email,
        },
      });

      console.log("Reservation saved with ID:", reservationId);
      setDone(true);

      // Give the user a moment to see the success state
      setTimeout(() => onSuccess(), 2000);
    } catch (err) {
      console.error(err);
      setError("Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success screen
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-white bg-surface">
        <div className="p-8 bg-black/40 rounded-2xl border border-white/10 shadow-2xl max-w-md mx-auto">
          <CheckCircle size={50} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-serif mb-2">Reservation Confirmed!</h2>
          <p className="text-gray-400 mb-1">
            We&apos;ll be ready to serve you, {user.name || "Guest"}.
          </p>
          <p className="text-gray-500 text-sm">
            A confirmation has been saved in our system.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Main reservation form
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-surface text-white">
      <div className="max-w-lg mx-auto bg-surface-light p-8 rounded-2xl border border-white/5 shadow-xl space-y-6">
        {/* Header + back button */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500">
            Table Reservation
          </span>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-3xl font-serif mb-2">Reserve a Table</h2>
          <p className="text-gray-400 text-sm">
            Plan your perfect dining experience at Alpha&nbsp;Mandi.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-900/30 border border-red-500/30 rounded px-3 py-2">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Date */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
              Date
            </label>
            <div className="flex items-center bg-black border border-white/10 rounded px-4 py-3">
              <Calendar size={18} className="text-primary mr-2" />
              <input
                type="date"
                className="bg-transparent flex-1 outline-none text-white"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
              Time
            </label>
            <div className="flex items-center bg-black border border-white/10 rounded px-4 py-3">
              <Clock size={18} className="text-primary mr-2" />
              <input
                type="time"
                className="bg-transparent flex-1 outline-none text-white"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
              Guests
            </label>
            <div className="flex items-center bg-black border border-white/10 rounded px-4 py-3">
              <Users size={18} className="text-primary mr-2" />
              <input
                type="number"
                min={1}
                className="bg-transparent flex-1 outline-none text-white"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Special Request */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
              Special Request
            </label>
            <textarea
              className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white h-24 outline-none"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Any notes or preferences?"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 text-gray-500 hover:text-white uppercase text-xs tracking-widest"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!date || !time || loading}
              className="flex-[2] bg-primary text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Reserve Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

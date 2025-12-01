// services/emailService.ts
import emailjs from "@emailjs/browser";

// From .env.local
// ORDER template       -> template_r9bip8d
// RESERVATION template -> template_vamb80e

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const ORDER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID as string; // template_r9bip8d
const RES_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_RES_TEMPLATE_ID as string;     // template_vamb80e
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

if (!SERVICE_ID || !ORDER_TEMPLATE_ID || !RES_TEMPLATE_ID || !PUBLIC_KEY) {
  console.warn("⚠️ EmailJS env vars are missing. Emails will not be sent.");
}

/**
 * ORDER CONFIRMATION EMAIL
 * Uses template_r9bip8d
 */
export const sendOrderConfirmationEmail = async (params: {
  toName: string;
  toEmail: string;
  orderId: string;
  total: number;
}) => {
  if (!SERVICE_ID || !ORDER_TEMPLATE_ID || !PUBLIC_KEY) return;

  await emailjs.send(
    SERVICE_ID,
    ORDER_TEMPLATE_ID,
    {
      to_name: params.toName,
      to_email: params.toEmail,
      order_id: params.orderId,
      order_total: params.total.toFixed(2),
    },
    PUBLIC_KEY
  );
};

/**
 * RESERVATION CONFIRMATION EMAIL
 * Uses template_vamb80e
 */
export const sendReservationConfirmationEmail = async (params: {
  toName: string;
  toEmail: string;
  reservationId: string;
  date: string;
  time: string;
  guests: number;
}) => {
  if (!SERVICE_ID || !RES_TEMPLATE_ID || !PUBLIC_KEY) return;

  await emailjs.send(
    SERVICE_ID,
    RES_TEMPLATE_ID,
    {
      to_name: params.toName,
      to_email: params.toEmail,
      reservation_id: params.reservationId,
      reservation_date: params.date,
      reservation_time: params.time,
      reservation_guests: params.guests,
    },
    PUBLIC_KEY
  );
};

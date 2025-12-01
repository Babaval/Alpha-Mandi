// services/backendService.ts
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Basic user context stored with each operation
 */
export type UserContext = {
  userId?: string;
  email?: string;
  name?: string;
};

/**
 * ORDER TYPES
 */
export type OrderItem = {
  menuItemId: string;   // id from menuItems collection
  name: string;         // item name
  quantity: number;
  price: number;        // price per unit at time of order
};

export type OrderPayload = {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: string;
  status: "PENDING" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
  user?: UserContext;
};

/**
 * RESERVATION TYPES
 */
export type ReservationPayload = {
  date: string;         // "2025-11-26"
  time: string;         // "19:30"
  guests: number;
  name?: string;
  phone?: string;
  specialRequest?: string;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  user?: UserContext;
};

/**
 * CATERING TYPES
 */
export type CateringPayload = {
  eventDate: string;
  eventType: string;    // "Wedding", "Corporate", etc.
  guestCount: number;
  budget?: number;
  notes?: string;
  status?: "PENDING" | "QUOTED" | "CONFIRMED" | "CANCELLED";
  user?: UserContext;
};

/**
 * PAYMENT TYPES
 */
export type PaymentPayload = {
  orderId?: string;
  amount: number;
  currency: string;     // "USD", "INR", etc.
  method: string;       // "CARD", "CASH", "UPI", etc.
  status: "INITIATED" | "SUCCESS" | "FAILED";
  gatewayRef?: string;  // reference from Stripe/Razorpay/etc. (or simulated)
  user?: UserContext;
};

/**
 * ACTIVITY LOG TYPES
 */
export type ActivityPayload = {
  type: string;         // "ORDER_CREATED", "PAYMENT_SUCCESS", etc.
  message: string;
  data?: any;           // extra info like { orderId, paymentId }
  user?: UserContext;
};

/* ------------------------------------------------------------------ */
/*                          FIRESTORE HELPERS                          */
/* ------------------------------------------------------------------ */

/**
 * Generic activity logger. Every major action calls this so you have
 * a full history in the `activityLogs` collection.
 */
export const logActivity = async (activity: ActivityPayload) => {
  await addDoc(collection(db, "activityLogs"), {
    ...activity,
    createdAt: serverTimestamp(),
  });
};

/**
 * Create a new order in `orders` collection and log activity.
 */
export const createOrder = async (order: OrderPayload) => {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });

  await logActivity({
    type: "ORDER_CREATED",
    message: `Order created with total ${order.total}`,
    data: { orderId: docRef.id },
    user: order.user,
  });

  return docRef.id;
};

/**
 * Create a table reservation in `reservations` collection.
 */
export const createReservation = async (reservation: ReservationPayload) => {
  const docRef = await addDoc(collection(db, "reservations"), {
    status: "PENDING",
    ...reservation,
    createdAt: serverTimestamp(),
  });

  await logActivity({
    type: "RESERVATION_CREATED",
    message: `Reservation for ${reservation.guests} guests`,
    data: { reservationId: docRef.id },
    user: reservation.user,
  });

  return docRef.id;
};

/**
 * Create a catering request in `cateringRequests` collection.
 */
export const createCateringRequest = async (catering: CateringPayload) => {
  const docRef = await addDoc(collection(db, "cateringRequests"), {
    status: "PENDING",
    ...catering,
    createdAt: serverTimestamp(),
  });

  await logActivity({
    type: "CATERING_REQUEST_CREATED",
    message: `Catering request for ${catering.guestCount} guests`,
    data: { cateringRequestId: docRef.id },
    user: catering.user,
  });

  return docRef.id;
};

/**
 * Log a payment attempt/result in `payments` collection.
 */
export const logPayment = async (payment: PaymentPayload) => {
  const docRef = await addDoc(collection(db, "payments"), {
    ...payment,
    createdAt: serverTimestamp(),
  });

  await logActivity({
    type: `PAYMENT_${payment.status}`,
    message: `Payment ${payment.status} for ${payment.amount} ${payment.currency}`,
    data: { paymentId: docRef.id, orderId: payment.orderId },
    user: payment.user,
  });

  return docRef.id;
};

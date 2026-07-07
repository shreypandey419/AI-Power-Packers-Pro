import axios from "axios";

const API = "http://localhost:5001/api/bookings";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
  },
});

export const createBooking = async (booking) => {
  const res = await axios.post(
    API,
    booking,
    getToken()
  );

  return res.data;
};

export const getMyBookings = async () => {
  const res = await axios.get(
    `${API}/my`,
    getToken()
  );

  return res.data;
};

export const getBooking = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    getToken()
  );

  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await axios.put(
    `${API}/${id}`,
    {
      bookingStatus: "Cancelled",
    },
    getToken()
  );

  return res.data;
};

export const createPaymentOrder = async (bookingId) => {
  const res = await axios.post(
    `${API}/${bookingId}/create-order`,
    {},
    getToken()
  );

  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axios.post(
    `${API}/verify-payment`,
    data,
    getToken()
  );

  return res.data;
};
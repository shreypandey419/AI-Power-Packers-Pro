import axios from "axios";

const API = "http://localhost:5001/api/reviews";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
  },
});

export const createReview = async (data) => {
  const res = await axios.post(API, data, getToken());
  return res.data;
};

export const getReviews = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }
  );

  return res.data;
};

export const getMyReview = async (bookingId) => {
  const res = await axios.get(
    `${API}/booking/${bookingId}`,
    getToken()
  );

  return res.data;
};
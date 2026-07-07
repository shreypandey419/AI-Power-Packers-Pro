import axios from "axios";

const API = "http://localhost:5001/api/quotations";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const saveQuotation = async (quotation) => {
  const res = await axios.post(
    API,
    quotation,
    getToken()
  );

  return res.data;
};

export const getLeadQuotations = async (leadId) => {
  const res = await axios.get(
    `${API}/lead/${leadId}`,
    getToken()
  );

  return res.data;
};

export const deleteQuotation = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    getToken()
  );

  return res.data;
};
export const getQuotation = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    getToken()
  );

  return res.data;
};
export const sendQuotationEmail = async (email) => {
  const res = await axios.post(
    `${API}/send-email`,
    { email },
    getToken()
  );

  return res.data;
};
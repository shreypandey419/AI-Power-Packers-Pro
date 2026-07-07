import axios from "axios";

const API = "http://localhost:5001/api/bookings";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllBookings = async (
  status = "",
  search = "",
  fromDate = "",
  toDate = ""
) => {
  const res = await axios.get(
    `${API}?status=${status}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`,
    getToken()
  );

  return res.data;
};

export const updateBookingStatus = async (
  id,
  bookingStatus,
  driverData = {}
) => {
  const res = await axios.put(
    `${API}/${id}`,
    {
      bookingStatus,
      ...driverData,
    },
    getToken()
  );

  return res.data;
};

export const exportBookingsExcel = async () => {
  const res = await axios.get(
    `${API}/export/excel`,
    {
      responseType: "blob",
      ...getToken(),
    }
  );

  return res.data;
};
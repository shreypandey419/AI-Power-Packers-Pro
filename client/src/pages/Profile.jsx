import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";
import { uploadProfileImage } from "../services/uploadService";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: "",
  });

  const [uploading, setUploading] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.user);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);
  
  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      setUploading(true);

      const res = await uploadProfileImage(file);

      setUser((prev) => ({
        ...prev,
        profileImage: res.image,
      }));

      localStorage.setItem(
        "customer",
        JSON.stringify({
          ...user,
          profileImage: res.image,
        })
      );

      toast.success("Profile image updated");

    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(user);

      setUser(res.user);

      localStorage.setItem(
        "customer",
        JSON.stringify(res.user)
      );

      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-5 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center md:text-left">
          My Profile
        </h1>

        <div className="flex flex-col items-center mb-10">

          <img
            src={
              user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />

          <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

            {uploading ? "Uploading..." : "Change Photo"}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />

          </label>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={user.email || ""}
              readOnly
              className="w-full border p-3 rounded-lg mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={user.dob || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={user.gender || "Male"}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={user.pincode || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              City
            </label>

            <input
              type="text"
              name="city"
              value={user.city || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              State
            </label>

            <input
              type="text"
              name="state"
              value={user.state || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}
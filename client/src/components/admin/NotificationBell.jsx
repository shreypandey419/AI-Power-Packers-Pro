import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
} from "../../services/notificationService";

export default function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  const unread = notifications.filter(
    (n) => !n.isRead
  ).length;

  const handleRead = async (id) => {
    await markAsRead(id);
    loadNotifications();
  };

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative text-3xl"
      >
        🔔

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
            {unread}
          </span>
        )}
      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl z-50">

          <div className="p-4 border-b font-bold">
            Notifications
          </div>

          {notifications.length === 0 ? (

            <div className="p-5 text-gray-500">
              No Notifications
            </div>

          ) : (

            notifications.map((item) => (

              <div
                key={item._id}
                onClick={() => handleRead(item._id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  !item.isRead
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.message}
                </p>
              </div>

            ))

          )}

        </div>

      )}

    </div>
  );
}
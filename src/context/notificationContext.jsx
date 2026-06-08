import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  return (
    <NotificationContext.Provider value={addNotification}>
      {children}
      <div className="toast-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`toast-item ${notification.type}`}
          >
            {notification.message}
            <button onClick={() => removeNotification(notification.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

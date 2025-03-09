import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [userNotifications, setUserNotifications] = useState([]);
  const navigate = useNavigate();

  const handleResponses = (status) => {
    switch (status) {
      case 401:
        toast(title, {
          description: "Session timeout. SignIn to continue",
        });
        localStorage.removeItem("accessToken");
        navigate("/sign-in");
        break;
      case 404:
        toast(title, {
          description: "User not found",
        });
        break;
      case 400:
        toast(title, {
          description: "Server in not responding.",
        });
        break;
      case 409:
        toast(title, {
          description: "Server error. Bad reaquest.",
        });
        break;
      case 500:
        toast(title, {
          description: "Internal Server Error.",
        });
        break;
      default:
        break;
    }
  };

  const getAllNotificationByUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/notifications/get-all-by-user",
        { withCredentials: true }
      );
      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to fetch notifications!" };
      } else {
        setUserNotifications(response.data.data);
        // toast("Cypher", {
        //     description: "Successfully fetched all products!"
        // });
        return { success: true, message: "Failed to fetch notifications!" };
      }
    } catch (error) {
      console.log("Error while fetching notifications for user: ", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to fetch notifications!",
      };
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        getAllNotificationByUser,
        userNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  return context;
};

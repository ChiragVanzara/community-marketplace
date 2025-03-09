import AppSidebar from "@/components/CommonComponents/AppSidebar/AppSidebar";
import HomePageNavbar from "@/components/HomePageComponents/HomePageNavbar";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthContext, AuthProvider } from "@/context/AuthProvider";
import {
  NotificationProvider,
  useNotificationContext,
} from "@/context/NotificationProvider";
import React, { useContext, useEffect } from "react";

function NotificationPage() {
  const { userNotifications, getAllNotificationByUser } =
    useNotificationContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllNotificationByUser();
  }, []);

  console.log(user);
  console.log(userNotifications);

  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar>
          <div className="w-full sticky top-0 z-50">
            <HomePageNavbar />
          </div>

          <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl">
            Notifications:
          </h1>

          <div className="m-4 space-y-4">
            {userNotifications.length > 0 ? (
              userNotifications.map((notification) => {
                const isSeller = user?.isSeller;
                console.log(notification.recipient?._id);
                console.log(notification.user?._id);
                console.log(isSeller);
                return (
                  <Card
                    key={notification._id}
                    className="p-4 shadow-md border rounded-lg"
                  >
                    {isSeller ? (
                      <p className="text-lg flex justify-between">
                        <span>
                          <strong>{notification.user?.fullName}</strong> wants
                          to buy your product{" "}
                          <strong>{notification.product?.name}</strong>.
                        </span>
                        <div>
                          <button className="ml-2 px-3 py-1 bg-green-500 text-white rounded-md">
                            Accept
                          </button>
                          <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md">
                            Reject
                          </button>
                        </div>
                      </p>
                    ) : (
                      <p className="text-lg flex justify-between">
                        <span>
                          You requested{" "}
                          <strong>{notification.recipient?.fullName}</strong> to
                          buy <strong>{notification.product?.name}</strong>.
                        </span>
                        <span className="border p-2 rounded-md">{"jyiu"}</span>
                      </p>
                    )}
                  </Card>
                );
              })
            ) : (
              <p>No notifications found.</p>
            )}
          </div>
        </AppSidebar>
      </SidebarProvider>
    </div>
  );
}

export default NotificationPage;

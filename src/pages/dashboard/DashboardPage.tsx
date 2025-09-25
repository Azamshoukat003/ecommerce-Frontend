import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserCircle,
  FaClipboardList,
  FaCreditCard,
  FaBox,
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AddPaymentMethodModal from "../paymentMethod/AddPaymentMethodPage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import ProfileTab from "./tabsPages/ProfileTab";
import OrdersTab from "./tabsPages/OrdersTab";
import PaymentTab from "./tabsPages/PaymentMethodsTab";

const tabMap = {
  profile: 0,
  orders: 1,
  payment: 2,
};

const reverseTabMap = ["profile", "orders", "payment"];

const ProfileDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const currentTab = reverseTabMap.includes(tab || "")
    ? (tab as keyof typeof tabMap)
    : "profile";

  useEffect(() => {
    if (!tab) navigate("/dashboard/profile", { replace: true });
  }, [tab, navigate]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const newTab = reverseTabMap[newValue];
    navigate(`/dashboard/${newTab}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Welcome back, {user?.name}!
          </h2>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800  rounded-xl shadow overflow-x-auto">
            <Tabs
              value={tabMap[currentTab]}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
              textColor="primary"
              allowScrollButtonsMobile
            >
              <Tab
                icon={<FaUserCircle />}
                iconPosition="start"
                label="My Profile"
                className="dark:text-white"
              />
              <Tab
                icon={<FaClipboardList />}
                iconPosition="start"
                label="My Orders"
                className="dark:text-white"
              />
              <Tab
                icon={<FaCreditCard />}
                iconPosition="start"
                label="My Payment"
                className="dark:text-white"
              />
            </Tabs>
          </div>

          {/* Tab Content */}
          {currentTab === "profile" && <ProfileTab />}
          {currentTab === "orders" && <OrdersTab />}
          {currentTab === "payment" && (
            <PaymentTab onAddPayment={() => setModalOpen(true)} />
          )}
        </div>
      </div>
      <AddPaymentMethodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
      />
      <Footer />
    </>
  );
};

export default ProfileDashboardPage;

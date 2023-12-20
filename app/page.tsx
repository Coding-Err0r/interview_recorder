import Interview from "@/components/Interview";
import WebRecorder from "@/components/WebRecorder";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden bg-white">
      <ToastContainer />
      <Interview />
    </div>
  );
};

export default Homepage;

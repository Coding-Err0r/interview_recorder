"use client";
import React, { useState, useEffect } from "react";

export const Delay = ({ children, delay }: any) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(showTimer);
  });

  return done && <>{children}</>;
};

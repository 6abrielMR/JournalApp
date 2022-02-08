import React from "react";
import { Route, Routes } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { NotFoundScreen } from "../components/journal/NotFoundScreen";

export const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<JournalScreen />} />
        <Route path="/*" element={<NotFoundScreen />} />
      </Routes>
    </>
  );
};

import { IWebApp } from "../interfaces/web-app.interface";
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import MainMenuPage from "../pages/Main-menu.page";
import { ITraining } from "../interfaces/training.interface";
import ErrorPage from "../pages/Error.page";
import Api from "../api/api";
import TrainingHistoryTablePage from "../pages/Training-history-table.page";

function App() {
  const api = new Api();
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const [trainingsList, setTrainingsList] = useState<ITraining[]>();

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const telegramUser = useMemo(() => {
    return webApp ? webApp.initDataUnsafe.user : null;
  }, [webApp]);

  useEffect(() => {
    telegramUser &&
      api.getTrainingsList(telegramUser?.id).then((data) => {
        setTrainingsList(data?.message.data);
      });
  }, [telegramUser]);

  const userRouters = (
    <>
      <Route index element={<MainMenuPage trainingsList={trainingsList} />} />
      <Route
        path="/training-history/:trainingId"
        element={<TrainingHistoryTablePage />}
      />
    </>
  );

  const errorRoutes = (
    <>
      <Route index element={<ErrorPage />} />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {telegramUser?.id ? userRouters : errorRoutes}
        <Route path="*" element={<Navigate replace to={`/`} />} />
      </Route>
    </Routes>
  );
}

export default App;

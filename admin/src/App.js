import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { hotelColumns, userColumns,roomColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    else return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="users">
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={userColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User"/>}
          />
        </Route>
        <Route path="hotels">
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={hotelColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewHotel  />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="rooms">
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={roomColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewRoom  />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

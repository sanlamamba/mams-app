import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Login from "./pages/Admin/Login";
import AdminLayout from "./layout/AdminLayout";
import GalerieNew from "./pages/Admin/Galerie/GalerieNew";
import MessageList from "./pages/Admin/Message/MessageList";
// import { toast } from "react-toastify";
import ClipsList from "./pages/Admin/Clips/ClipsList";
import ClipsNouveau from "./pages/Admin/Clips/ClipsNouveau";
import ClipEdit from "./pages/Admin/Clips/ClipEdit";
import MusicList from "./pages/Admin/Projet/MusicList";
import NewMusic from "./pages/Admin/Projet/NewMusic";
import EditMusic from "./pages/Admin/Projet/EditMusic";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOAD_LOGIN" });
    }
  }, [dispatch]);

  return (
    <div id="App">
      <Routes>
        <Route path="*" element={<Login />} />
        {/* <Route
          path="*"
          element={
            <UserLayout>
              <img
                src="/assets/images/background-main.jpg"
                className="background-main"
                alt="Mams background"
              />
            </UserLayout>
          }
        /> */}

        <Route
          path="/profile"
          element={
            <AdminLayout>
              <h1>Mams App</h1>
            </AdminLayout>
          }
        />

        <Route
          path="/galerie/"
          element={
            <AdminLayout>
              <GalerieNew />
            </AdminLayout>
          }
        />
        <Route
          path="/message/"
          element={
            <AdminLayout>
              <MessageList />
            </AdminLayout>
          }
        />
        <Route
          path="/clips/"
          element={
            <AdminLayout>
              <ClipsList />
            </AdminLayout>
          }
        />
        <Route
          path="/clips/nouveau"
          element={
            <AdminLayout>
              <ClipsNouveau />
            </AdminLayout>
          }
        />
        <Route
          path="/clips/:id"
          element={
            <AdminLayout>
              <ClipEdit />
            </AdminLayout>
          }
        />
        <Route
          path="/projet/"
          element={
            <AdminLayout>
              <MusicList />
            </AdminLayout>
          }
        />
        <Route
          path="/projet/nouveau"
          element={
            <AdminLayout>
              <NewMusic />
            </AdminLayout>
          }
        />
        <Route
          path="/projet/:id"
          element={
            <AdminLayout>
              <EditMusic />
            </AdminLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

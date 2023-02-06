import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "./layout/UserLayout";
import Projet from "./pages/UserPage/Projet";
import Contact from "./pages/UserPage/Contact";
import Galerie from "./pages/UserPage/Galerie";
import Clips from "./pages/UserPage/Clips";
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
        <Route
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
        />
        <Route
          path="/projet"
          element={
            <UserLayout>
              <Projet />
            </UserLayout>
          }
        />
        <Route
          path="/galerie"
          element={
            <UserLayout>
              <Galerie />
            </UserLayout>
          }
        />
        <Route
          path="/clips"
          element={
            <UserLayout>
              <Clips />
            </UserLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <h1>Mams App</h1>
            </AdminLayout>
          }
        />

        <Route
          path="/admin/galerie/"
          element={
            <AdminLayout>
              <GalerieNew />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/message/"
          element={
            <AdminLayout>
              <MessageList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/clips/"
          element={
            <AdminLayout>
              <ClipsList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/clips/nouveau"
          element={
            <AdminLayout>
              <ClipsNouveau />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/clips/:id"
          element={
            <AdminLayout>
              <ClipEdit />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projet/"
          element={
            <AdminLayout>
              <MusicList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projet/nouveau"
          element={
            <AdminLayout>
              <NewMusic />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projet/:id"
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

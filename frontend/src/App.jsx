import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "./layout/UserLayout";
import Projet from "./pages/UserPage/Projet";
import Contact from "./pages/UserPage/Contact";
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
        <Route path="*" element={<UserLayout>HEllo</UserLayout>} />
        <Route
          path="/projet"
          element={
            <UserLayout>
              <Projet />
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
      </Routes>
    </div>
  );
}

export default App;

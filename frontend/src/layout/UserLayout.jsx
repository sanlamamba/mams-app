import React from "react";
import MainNav from "../components/Navbars/MainNav";
import Popup from "../components/general/Popup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function UserLayout({ children }) {
  const [popup, setPopup] = React.useState(true);
  const dispatch = useDispatch();
  // get variables from redux runSaga
  const followed = useSelector((state) => state.follow.followed);

  console.log(followed);

  useEffect(() => {}, []);

  return (
    <div className="container-fluid" id="content-container">
      <Popup open={followed} />
      <div className="row">
        <MainNav />
      </div>
      <div className="row" id="content">
        {children}
      </div>
    </div>
  );
}

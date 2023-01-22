import React from "react";
import MainNav from "../components/Navbars/MainNav";
import Popup from "../components/general/Popup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function UserLayout({ children }) {
  // get variables from redux runSaga
  const followed = useSelector((state) => state.follow.followed);

  console.log(followed);

  const [isPermitted, setIsPermitted] = React.useState(followed);

  useEffect(() => {
    const localFollowed = localStorage.getItem("followed");
    if (localFollowed) {
      setIsPermitted(true);
    }
  }, []);

  return (
    <div className="container-fluid" id="content-container">
      <Popup open={isPermitted} />
      <div className="row">
        <MainNav />
      </div>
      <div className="row" id="content">
        {children}
      </div>
    </div>
  );
}

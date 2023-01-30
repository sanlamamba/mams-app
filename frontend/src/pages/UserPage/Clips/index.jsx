import React from "react";
import Swiper3D from "../../../components/Clips/Swiper3D";
import { assetsLocations } from "../../../utils/assetsLocations";

export default function index() {
  return (
    <div className="container-fluid contact_container">
      <div className="row mt-3">
        <div className="col-12">
          <Swiper3D location={assetsLocations} />
        </div>
      </div>
    </div>
  );
}

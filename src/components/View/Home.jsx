import React from "react";
import Actions from "./Common/Actions";
import Uploader from "./Common/Uploader";

const Home = () => {
  return (
    <div className="p-3">
      <Actions></Actions>
      <Uploader></Uploader>
    </div>
  );
};

export default Home;

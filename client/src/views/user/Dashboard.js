import React, { useEffect, useState } from "react";
import { UserNav } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h1>User Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  usersList,
} from "../../../Redux/ActionCreater/AdminAction";
import List from "./List";
import { ThreeDots } from "react-loader-spinner";

function Users() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.users);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(usersList());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading && loading ? (
        <div className="loader">
          <ThreeDots
            type="Spinner Type"
            color="crimson"
            height={80}
            width={80}
          />
        </div>
      ) : (
        <div className="dashboard">
          {users && users.map((user) => <List user={user} key={user._id} />)}
        </div>
      )}
    </>
  );
}

export default Users;

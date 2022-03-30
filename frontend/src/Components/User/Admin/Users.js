import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteUser,
  usersList,
} from "../../../Redux/ActionCreater/AdminAction";
import List from "./List";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { DELETE_USER_LIST_RESET } from "../../../Redux/ActionTypes/adminActionType";

function Users() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users, isDeleted } = useSelector(
    (state) => state.users
  );

  const deleteUserHandle = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Artist Deleted");
      navigate("/admin/artists");
      dispatch({ type: DELETE_USER_LIST_RESET });
    }
    dispatch(usersList());
  }, [dispatch, error, alert, isDeleted, navigate]);

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
          {users &&
            users.map((user) => (
              <List
                user={user}
                key={user._id}
                deleteUserHandle={deleteUserHandle}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Users;

import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  artistsList,
  clearErrors,
} from "../../../Redux/ActionCreater/AdminAction";
import List from "./List";
import { ThreeDots } from "react-loader-spinner";

function Artists() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, artists } = useSelector((state) => state.artists);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(artistsList());
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
          {artists &&
            artists.map((user) => <List user={user} key={user._id} />)}
        </div>
      )}
    </>
  );
}

export default Artists;

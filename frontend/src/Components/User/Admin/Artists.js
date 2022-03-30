import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  artistsList,
  clearErrors,
  deleteArtist,
} from "../../../Redux/ActionCreater/AdminAction";
import List from "./List";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { DELETE_ARTIST_LIST_RESET } from "../../../Redux/ActionTypes/adminActionType";

function Artists() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, artists, isDeleted } = useSelector(
    (state) => state.artists
  );
  const deleteArtistHandle = (id) => {
    dispatch(deleteArtist(id));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Artist Deleted");
      navigate("/admin/artists");
      dispatch({ type: DELETE_ARTIST_LIST_RESET });
    }
    dispatch(artistsList());
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
          {artists &&
            artists.map((user) => (
              <List
                user={user}
                key={user._id}
                deleteUserHandle={deleteArtistHandle}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Artists;

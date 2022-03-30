import React from "react";
import { MdDelete } from "react-icons/md";
function List({ user, deleteUserHandle }) {
  return (
    <div className="list-wrapper">
      <div className="pic">
        <img src={user.avatar.url} alt={user.name} />
      </div>
      <div>
        <h6>{user.name}</h6>
      </div>
      <div>
        <p>{user.email}</p>
      </div>
      <div>
        <p>{user.role}</p>
      </div>
      <MdDelete
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => deleteUserHandle(user._id)}
      />
    </div>
  );
}

export default List;

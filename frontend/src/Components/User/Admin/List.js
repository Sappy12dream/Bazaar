import React from "react";

function List({user}) {
  
  return (
    <div className="list-wrapper">
      <div className="pic">
        <img src={user.avatar.url}
         alt={user.name} />
      </div>
      <h6>{user.name}</h6>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
}

export default List;

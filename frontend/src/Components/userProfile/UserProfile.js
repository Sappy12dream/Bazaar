import React from "react";
import { IoMail } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
function UserProfile({ user, Active }) {
  return (
    <>
      {Active ? (
        <div className="user-profile">
          <div className="header">
            <div>
              <img src={user.avatar.url} alt={user.name} />
              <p>{user.name}</p>
              <Link to="/me/update">
                <MdEdit />
              </Link>
            </div>
          </div>
          <div>
            <IoMail /> {user.email}
          </div>
          <Link to='/password/change'>Change Password</Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserProfile;

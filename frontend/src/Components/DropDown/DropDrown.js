import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function DropDrown({name, list}) {
  const [Active, setActive] = useState(false);
  return (
    <div className="drop-down" onClick={() => setActive(!Active)}>
      <div className="option">
        <p>{name}</p>
        <IoIosArrowDown />
      </div>
      {Active && (
        <div className="list">
            {list.map((item)=>(
                <div className="item">{item}</div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DropDrown;

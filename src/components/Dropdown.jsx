import { useState } from "react";

export const Dropdown = ({ label }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/* trigger button */}
      <button onClick={() => console.log(label)}>{label}</button>
      {/* dropdown content */}
      {visible && <div className="">dropdown</div>}
    </>
  );
};

export default Dropdown;

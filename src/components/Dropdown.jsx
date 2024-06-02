import { Link } from "react-router-dom";

export const Dropdown = ({ label, links }) => {
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div tabIndex={0} role="button" className="btn rounded-btn">
        {label}
      </div>
      <div className="absolute z-10 h-7 w-[110%] -translate-x-3 -translate-y-2" />
      <ul
        tabIndex={0}
        className="b menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2"
      >
        {links &&
          links.map((link, index) => {
            console.log(link);
            return (
              <li key={index} onClick={link.action}>
                <Link>{link.label}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Dropdown;

import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <div>
      <h1>Slide Bar</h1>
      <h1>Head Bar</h1>
      <hr />
      <Outlet />
    </div>
  );
};
export default LayoutUser;

// import { useDispatch } from "react-redux";
import AuthService from "../../appwrite/auth/AuthService";

import { logout } from "../../redux/reducers/auth_slice";
import { useAppDispatch } from "../../redux/hooks";

const LogOutBtn = () => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    AuthService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;

import { useEffect, useState } from "react";
import "./App.css";
// import { useDispatch } from "react-redux";

import AuthService from "./appwrite/auth/AuthService";
import { login, logout } from "./redux/reducers/auth_slice";
import { Footer, Header } from "./components";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full-block">
        <Header />
        <main>
          {/* TODO: Outlet  */}
          {/* <Outlet></Outlet> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

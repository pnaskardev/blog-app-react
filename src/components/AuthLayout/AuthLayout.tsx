/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Protected = ({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication: boolean;
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;

import React, { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isError, isLoading, isSuccess, isUninitialized, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      //react 18 strict mode

      const verifyRefreshToken = async () => {
        try {
          // const response =
          await refresh();
          // const {accessToken} = response.data;
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    //eslint-disable-next-line
  }, []);

  let content;

  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>loading ...</p>;
  } else if (isError) {
    content = (
      <p>
        {error.data?.message}
        <Link to={"/login"}>please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;

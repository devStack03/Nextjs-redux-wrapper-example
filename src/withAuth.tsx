import { useRouter } from "next/router";
import Router from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "./store/hook";

const withAuth = (WrappedComponent) => (props: any) => {
  const router = useRouter();

  const { loggedin } = useAppSelector(state => state.auth)
  console.log(loggedin);
  useEffect(() => {
    if (!loggedin) {
      router.push('/login', undefined, { shallow : true});
    }
  }, [loggedin])

  if (!loggedin) {
    return <></>
  }
  return <WrappedComponent {...props} />;
}

export default withAuth
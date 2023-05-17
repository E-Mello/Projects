import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Protected: NextPage = (): JSX.Element => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <div>
        <h1>This Page is from Protected Peoples {"\n"}</h1>
        {JSON.stringify(data.user, null, 2)}
      </div>
    );

  return <h1>Loading...</h1>;
};

export default Protected;

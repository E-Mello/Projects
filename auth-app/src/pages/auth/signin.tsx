import { FormEventHandler, useState } from "react";

import { NextPage } from "next";
import { signIn } from "next-auth/react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    //validate user info
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };
  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          value={userInfo.username}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, username: target.value })
          }
        />
        <input
          type="password"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;

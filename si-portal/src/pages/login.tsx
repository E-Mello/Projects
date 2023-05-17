import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Tooltip = ({ message }: { message: string }) => {
  return (
    <div className="absolute bottom-4 left-4 rounded-md bg-red-500 px-4 py-2 text-white">
      {message}
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (result?.error) {
      setShowTooltip(true);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      {showTooltip && <Tooltip message="Invalid username or password" />}
      <h1 className="mb-8 text-4xl font-bold">Log in to your account</h1>
      <form onSubmit={handleSubmit} className="flex w-80 flex-col">
        <label className="mb-2 font-bold text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          className="mb-5 rounded-md border px-3 py-2 outline-none"
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label className="mb-2 font-bold text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="mb-5 rounded-md border px-3 py-2 outline-none"
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button
          className="mb-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

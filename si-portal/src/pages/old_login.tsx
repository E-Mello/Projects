// https://supabase-schema.vercel.app/
// supabase token: sbp_a9476c8be4789bc12bda7f1e8c5144f0c5a51565

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormEventHandler, useState } from "react";

import { BsWindowSidebar } from "react-icons/bs";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    //validate user info
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);

    if (res?.ok) {
      window.alert("Login Successful");
    } else {
      window.alert("Login Failed");
    }
  };

  return (
    <section className=" relative mt-8 flex h-[85vh] min-h-screen w-[100vw] flex-col items-center justify-center px-4 py-2">
      <div className="relative flex flex-col items-center justify-start">
        <div className="min-screen flex w-[10vw] flex-col justify-center whitespace-pre rounded-xl bg-zinc-800">
          <img
            src="unimed.svg"
            alt="unimed"
            className="flex h-[10vh] w-[10vw] justify-start"
          />
        </div>
        <form
          className=" borde relative flex h-[7.5vh] w-[15vw] flex-col items-center justify-center rounded-md bg-gray-100 p-8 shadow-sm"
          //   onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Usuário"
              className="flex h-[5vh] w-[15vw] flex-row rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="username"
              defaultValue=""
              // rules={{ required: true }}
              // error={errors.username?.message}
            />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              defaultValue=""
              className="flex h-[5vh] w-[15vw] flex-row rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              // rules={{ required: true }}
              // error={errors.password?.message}
            />

            <div className="flex h-[5vh] w-[15vw] flex-row items-end justify-center rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <button
                // onClick={}
                //disabled={loading}
                className="relative flex h-[5vh] w-[15vw] flex-row items-center justify-center rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center">
              <span>Esqueceu sua senha?</span>
              <Link href={"/dashboard"} className="ml-2">
                Clique Aqui!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

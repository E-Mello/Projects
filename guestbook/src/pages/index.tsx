import { signIn, signOut, useSession } from "next-auth/react";

import { GuestbookForm } from "../components/GuestbookForm";
import { Messages } from "../components/Messages";

// src/pages/index.tsx
export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 pt-20">
      <h1 className="text-3xl ">Guestbook</h1>
      {session ? (
        <div>
          <p>hi {session.user?.name}</p>
          <GuestbookForm />

          <button
            onClick={() => signOut()}
            className="h-fit rounded-xl bg-red-500 px-4 py-2 hover:bg-red-600 hover:drop-shadow-sharp/25"
          >
            LogOut
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("discord")}
          className="h-fit rounded-xl bg-blue-500  px-4 py-2 hover:bg-blue-600 hover:drop-shadow-sharp/25"
        >
          Logar com o discord
        </button>
      )}
      <Messages />
    </main>
  );
}

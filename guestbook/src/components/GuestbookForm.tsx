// src/pages/index.tsx

import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "./Input";
import { guestbookInput } from "../server/shared/guestbookInput";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TGuestbook = z.infer<typeof guestbookInput>;

export function GuestbookForm() {
  const { data: session } = useSession();

  // src/pages/index.tsx
  const utils = trpc.useContext();
  const postMessage = trpc.guestbook.postMessage.useMutation({
    // O mutate abaixo serve para fazer uma atualizacao otimista
    // onMutate: (newMsg) => {
    //   utils.guestbook.getAll.cancel();
    //   const oldMessages = utils.guestbook.getAll.getData();

    //   if (oldMessages) {
    //     utils.guestbook.getAll.setData([
    //         { ...newMsg, id: Math.random().toString() },
    //         ...oldMessages,
    //     ]);
    //   }
    // },

    onSettled: () => {
      utils.guestbook.getAll.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TGuestbook>({
    resolver: zodResolver(guestbookInput),
    defaultValues: {
      name: session?.user?.name as string,
    },
  });

  const submitMessage: SubmitHandler<TGuestbook> = async ({
    name,
    message,
  }) => {
    await postMessage.mutateAsync({
      name,
      message,
    });
    reset();
  };

  return (
    <form
      className="align-center flex gap-2"
      onSubmit={handleSubmit(submitMessage)}
    >
      <Input
        type="text"
        disabled={isSubmitting}
        placeholder="Your message..."
        aria-invalid={errors.message ? "true" : "false"}
        error={errors.message}
        {...register("message")}
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none aria-[invalid=true]:border-pink-600"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-fit rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

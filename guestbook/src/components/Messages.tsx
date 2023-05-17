// src/pages/index.tsx

import { trpc } from "../utils/trpc";

export function Messages() {
  const {
    data: messages,
    isLoading,
    error,
    isFetching,
  } = trpc.guestbook.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Fetching messages...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex w-11/12 max-w-md rounded-lg bg-neutral-800 p-4">
      <div className="flex flex-1 flex-col gap-4">
        {messages?.map((msg) => {
          return (
            <div key={msg.id} className="rounded-lg bg-neutral-900 p-4">
              <p>{msg.message}</p>
              <span>- {msg.name}</span>
            </div>
          );
        })}
        {isFetching && <div>Updating...</div>}
      </div>
    </div>
  );
}

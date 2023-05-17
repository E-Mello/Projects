import { type GetServerSidePropsContext } from "next";
import { supabase } from "../db/supabaseClient";

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const refreshToken = ctx.req.cookies["my-refresh-token"];
  const accessToken = ctx.req.cookies["my-access-token"];

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  } else {
    // make sure you handle this case!
    return null;
  }

  // returns user information
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

import React from "react";
import Head from "next/head";
import nc from "next-connect";
import { all } from "@/middlewares/index";
import { updateUserById, findAndDeleteTokenByIdAndType } from "@/db/index";

export default function EmailVerifyPage({ success }) {
  return (
    <section className="mx-auto max-w-lg">
      <Head>
        <title>Auto Exposure | Verify</title>
      </Head>
      <h1 className="font-bold text-3xl tracking-loose mb-4">
        Email Verification
      </h1>
      <p>
        {success
          ? "Thank you for verifying your email address. You may close this page."
          : "This link may have been expired."}
      </p>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const handler = nc();
  handler.use(all);
  await handler.run(ctx.req, ctx.res);

  const { token } = ctx.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    ctx.req.db,
    token,
    "emailVerify"
  );

  if (!deletedToken) return { props: { success: false } };

  await updateUserById(ctx.req.db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { success: true } };
}

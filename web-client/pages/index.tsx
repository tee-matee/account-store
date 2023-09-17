import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;
import BaseLayout from "@/layouts/base";

// type Repo = {
//   name: string;
//   stargazers_count: number;
// };

// export const getServerSideProps: GetServerSideProps<{
//   repo: Repo;
// }> = async () => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo = await res.json();
//   console.log("repo", repo);
//   return { props: { repo } };
// };

// export default function Home({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <BaseLayout>
//       <div>{repo.name}</div>
//     </BaseLayout>
//   );
// }

export default function Home({}) {
  return (
    <BaseLayout>
      <div>Home</div>
    </BaseLayout>
  );
}

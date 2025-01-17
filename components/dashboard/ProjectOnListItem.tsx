"use client";

import { useRouter } from "next/navigation";

export default function ProjectOnListItem({
  item,
}: {
  item: {
    id: string;
    name: string;
  };
}) {
  const router = useRouter();

  const handleClick = () => {
    console.log(`Clicked: ${item?.id}`);
    router.push(`/dashboard/project/${item?.id}`);
  };

  return <li onClick={handleClick}>{item?.name}</li>;
}

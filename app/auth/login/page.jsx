"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Page() {
  const {push} = useRouter();
  const { data: session } = useSession();

  return (
    <div>Login page
      <div></div>
      <div>New Name: {session?.user?.name}</div>
    </div>
  )
}

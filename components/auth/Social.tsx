import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "../ui/Button";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className='flex items-center justify-center w-full gap-x-2'>
      <Button
        className="w-full border border-gray-100"
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        className="w-full border border-gray-100"
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  )
}

export default Social

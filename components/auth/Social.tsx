import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "../ui/Button";

const Social = () => {
  return (
    <div className='flex items-center justify-center w-full gap-x-2'>
      <Button className="w-full border border-gray-100">
        <FcGoogle />
      </Button>
      <Button className="w-full border border-gray-100">
        <FaGithub />
      </Button>
    </div>
  )
}

export default Social

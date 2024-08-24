import Button from "@/components/ui/Button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex h-full flex-column items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication app
        </p>
        <div>
          <Link href='/auth/login'>
            <Button className="w-full">
                Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

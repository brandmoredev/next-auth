import { auth, signOut } from "@/auth";

const SettingsPage = async() => {
  const session = await auth()

  const logOut = async () => {
    "use server"
    await signOut();
  }

  return (
    <div>
      {JSON.stringify(session)}
      <form action={logOut}>
        <button type="submit">
          SignOut
        </button>
      </form>
    </div>
  )
}

export default SettingsPage

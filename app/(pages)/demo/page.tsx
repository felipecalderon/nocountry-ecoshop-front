import LoginButton from "@/app/components/auth/LoginButton"
import LogoutButton from "@/app/components/auth/LogoutButton"

export default function DemoPage() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <LoginButton />
      <LogoutButton />
    </div>
  )
}

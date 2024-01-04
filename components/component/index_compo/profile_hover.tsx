/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KHrgwLuLvn0
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { HoverCardTrigger, HoverCardContent, HoverCard } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Component({ setSelecteCompoId, user }) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push("/");
  };
  
  return (

    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar>
          <AvatarImage alt="User's Avatar" src="/placeholder.svg?height=50&width=50" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="User's Avatar" src="/placeholder.svg?height=50&width=50" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="space-y-1">

            <h4 className="text-lg font-semibold">{user}</h4>
            <p className="text-sm text-gray-500">Bio</p>
          </div>
        </div>
        <div className="justify-end">
          <Button className="w-full" variant="outline" onClick={handleLogout}>logout</Button>
        </div>

        <Button className="w-full" variant="outline" onClick={() => setSelecteCompoId(3)}>
          마이페이지
        </Button>
      </HoverCardContent>
    </HoverCard>
  )
}


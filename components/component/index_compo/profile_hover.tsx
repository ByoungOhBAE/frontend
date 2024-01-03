/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KHrgwLuLvn0
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { HoverCardTrigger, HoverCardContent, HoverCard } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export default function Component({userInfo}) {
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
            <h4 className="text-lg font-semibold">{userInfo}</h4>
            <p className="text-sm text-gray-500">Bio</p>
          </div>
        </div>
        
        <Button className="w-full" variant="outline">
          Follow
        </Button>
      </HoverCardContent>
    </HoverCard>
  )
}


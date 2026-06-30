"use client"
import { User, Package, MapPin, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()

  const links = [
    { name: "My Orders", href: "/allorders", icon: Package, desc: "Track your orders" },
    { name: "My Addresses", href: "/myaddress", icon: MapPin, desc: "Manage delivery addresses" },
    { name: "Settings", href: "/setting", icon: Settings, desc: "Update profile & password" },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <div className="bg-[#19b04b] pt-12 pb-32 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="opacity-90 mt-2">Welcome back, {session?.user?.name || "User"}</p>
        </div>
      </div>
      <div className="container mx-auto px-6 -mt-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm border max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-bold">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{session?.user?.name || "User"}</h2>
              <p className="text-gray-500">{session?.user?.email || "No email"}</p>
            </div>
          </div>
          <div className="space-y-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <link.icon size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{link.name}</p>
                    <p className="text-sm text-gray-500">{link.desc}</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

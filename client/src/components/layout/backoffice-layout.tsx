import { Link, useLocation } from "wouter";
import { LayoutGrid, Tag, Users, ShoppingBag, BarChart, Settings, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 my-1",
          active ? "bg-[#CFB3AD]/20 text-[#702912] font-medium" : "text-[#5D1B12]/80"
        )}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
};

export default function BackOfficeLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Navigation items for the sidebar
  const navItems = [
    { 
      label: "Dashboard", 
      icon: <LayoutGrid className="h-4 w-4" />, 
      href: "/admin" 
    },
    { 
      label: "Products", 
      icon: <Tag className="h-4 w-4" />, 
      href: "/admin/products" 
    },
    { 
      label: "Categories", 
      icon: <ShoppingBag className="h-4 w-4" />, 
      href: "/admin/categories" 
    },
    { 
      label: "Users", 
      icon: <Users className="h-4 w-4" />, 
      href: "/admin/users" 
    },
    {
      label: "Practitioners",
      icon: <User className="h-4 w-4" />,
      href: "/admin/practitioners"
    },
    {
      label: "Consultations",
      icon: <MessageSquare className="h-4 w-4" />,
      href: "/admin/consultations"
    },
    { 
      label: "Analytics", 
      icon: <BarChart className="h-4 w-4" />, 
      href: "/admin/analytics" 
    },
    { 
      label: "Settings", 
      icon: <Settings className="h-4 w-4" />, 
      href: "/admin/settings" 
    }
  ];

  return (
    <div className="flex h-screen bg-[#F9F6F5]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#CFB3AD]/20 p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-lg font-semibold text-[#5D1B12]">Ayurveda</span>
          <span className="text-sm text-[#833712] bg-[#CFB3AD]/10 px-2 py-0.5 rounded">Admin</span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location === item.href}
            />
          ))}
        </nav>
        
        <Separator className="my-4 bg-[#CFB3AD]/20" />
        
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#CFB3AD]/10">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#833712] text-white flex items-center justify-center text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#5D1B12]">Admin User</p>
              <p className="text-xs text-[#5D1B12]/60 truncate">admin@ayurveda.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
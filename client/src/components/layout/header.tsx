import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Face", href: "/face" },
  { name: "Hair", href: "/hair" },
  { name: "Body", href: "/body" },
  { name: "Wellness", href: "/wellness" },
  { name: "Combos", href: "/combos" },
  { name: "Consultation", href: "/consultation" },
  { name: "Know your Dosha", href: "/know-your-dosha" },
];

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3); // This would come from a cart context in a real app

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 backdrop-blur bg-white/80 border-b border-gray-100",
      scrolled && "shadow-md"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">Ayurveda</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "hover:text-[#34c759] transition-colors",
                location === item.href && "text-[#34c759]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#34c759] text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-6 mt-6 text-lg">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      location === item.href ? "text-[#34c759]" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

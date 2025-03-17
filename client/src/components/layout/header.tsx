import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  Leaf,
  Sparkles,
  Droplets,
  Flame,
  Wind,
  Heart,
  Users,
  CalendarDays,
  Flower
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { 
    name: "Face", 
    href: "/face",
    icon: <Sparkles className="w-4 h-4 mr-2" />,
    megamenu: [
      { 
        title: "Face Care Collections",
        items: [
          { name: "Cleansers & Face Wash", href: "/face/cleansers" },
          { name: "Moisturizers", href: "/face/moisturizers" },
          { name: "Serums & Oils", href: "/face/serums" },
          { name: "Face Masks", href: "/face/masks" },
          { name: "Eye Care", href: "/face/eye-care" },
          { name: "Lip Care", href: "/face/lip-care" }
        ]
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Skin", href: "/face/vata" },
          { name: "For Pitta Skin", href: "/face/pitta" },
          { name: "For Kapha Skin", href: "/face/kapha" },
          { name: "For Combination", href: "/face/combination" }
        ]
      },
      {
        title: "Concerns",
        items: [
          { name: "Anti-Aging", href: "/face/anti-aging" },
          { name: "Acne & Blemishes", href: "/face/acne-blemishes" },
          { name: "Hyperpigmentation", href: "/face/hyperpigmentation" },
          { name: "Sensitive Skin", href: "/face/sensitive-skin" }
        ]
      }
    ]
  },
  { 
    name: "Hair", 
    href: "/hair",
    icon: <Droplets className="w-4 h-4 mr-2" />,
    megamenu: [
      {
        title: "Hair Care Essentials",
        items: [
          { name: "Shampoos", href: "/hair/shampoos" },
          { name: "Conditioners", href: "/hair/conditioners" },
          { name: "Hair Oils", href: "/hair/oils" },
          { name: "Hair Treatments", href: "/hair/treatments" },
          { name: "Scalp Treatments", href: "/hair/scalp-treatments" }
        ]
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Hair", href: "/hair/vata" },
          { name: "For Pitta Hair", href: "/hair/pitta" },
          { name: "For Kapha Hair", href: "/hair/kapha" }
        ]
      },
      {
        title: "Concerns",
        items: [
          { name: "Hair Fall", href: "/hair/hair-fall" },
          { name: "Dandruff", href: "/hair/dandruff" },
          { name: "Dry & Damaged", href: "/hair/dry-damaged" },
          { name: "Premature Graying", href: "/hair/premature-graying" }
        ]
      }
    ]
  },
  { 
    name: "Body", 
    href: "/body",
    icon: <Flame className="w-4 h-4 mr-2" />,
    megamenu: [
      {
        title: "Body Care",
        items: [
          { name: "Body Wash", href: "/body/wash" },
          { name: "Body Oils", href: "/body/oils" },
          { name: "Body Lotions", href: "/body/lotions" },
          { name: "Body Scrubs", href: "/body/scrubs" },
          { name: "Hand & Foot Care", href: "/body/hand-foot" }
        ]
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Body", href: "/body/vata" },
          { name: "For Pitta Body", href: "/body/pitta" },
          { name: "For Kapha Body", href: "/body/kapha" }
        ]
      },
      {
        title: "Specialty Products",
        items: [
          { name: "Massage Oils", href: "/body/massage-oils" },
          { name: "Ubtan & Clay Packs", href: "/body/ubtan-clay" },
          { name: "Bath Salts", href: "/body/bath-salts" }
        ]
      }
    ]
  },
  { 
    name: "Wellness", 
    href: "/wellness",
    icon: <Leaf className="w-4 h-4 mr-2" />,
    megamenu: [
      {
        title: "Internal Wellness",
        items: [
          { name: "Herbal Supplements", href: "/wellness/supplements" },
          { name: "Teas & Infusions", href: "/wellness/teas" },
          { name: "Digestive Health", href: "/wellness/digestive-health" },
          { name: "Immunity Boosters", href: "/wellness/immunity" }
        ]
      },
      {
        title: "Dosha Balance",
        items: [
          { name: "Vata Balance", href: "/wellness/vata" },
          { name: "Pitta Balance", href: "/wellness/pitta" },
          { name: "Kapha Balance", href: "/wellness/kapha" },
          { name: "Tri-Dosha", href: "/wellness/tri-dosha" }
        ]
      },
      {
        title: "Mind & Spirit",
        items: [
          { name: "Meditation Aids", href: "/wellness/meditation" },
          { name: "Aromatherapy", href: "/wellness/aromatherapy" },
          { name: "Stress Relief", href: "/wellness/stress-relief" },
          { name: "Sleep Support", href: "/wellness/sleep" }
        ]
      }
    ]
  },
  { 
    name: "Combos", 
    href: "/combos",
    icon: <Heart className="w-4 h-4 mr-2" />
  },
  { 
    name: "Consultation", 
    href: "/consultation",
    icon: <Users className="w-4 h-4 mr-2" />
  },
  { 
    name: "Know your Dosha", 
    href: "/know-your-dosha",
    icon: <Wind className="w-4 h-4 mr-2" />
  },
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
      "fixed w-full z-50 transition-all duration-300 backdrop-blur bg-white/80 border-b border-[#CFB3AD]/30",
      scrolled && "shadow-md"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-[#5D1B12]">T.A.C</span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.megamenu ? (
                  <>
                    <NavigationMenuTrigger className={cn(
                      "text-[#5D1B12] hover:text-[#833712] transition-colors",
                      location === item.href ? "text-[#702912] font-semibold" : ""
                    )}>
                      <div className="flex items-center">
                        {item.icon}
                        {item.name}
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-3 gap-6 p-6 w-[800px]">
                        {item.megamenu.map((section, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="font-medium text-[#5D1B12] border-b border-[#CFB3AD]/30 pb-2">{section.title}</h4>
                            <ul className="space-y-2">
                              {section.items.map((subitem, subidx) => (
                                <li key={subidx}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subitem.href}
                                      className="block py-1 text-[#702912] hover:text-[#833712] transition-colors text-sm hover:underline"
                                    >
                                      {subitem.name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center py-2 px-3 text-sm rounded-md text-[#5D1B12] hover:text-[#833712] transition-colors hover:bg-[#CFB3AD]/10",
                      location === item.href ? "text-[#702912] font-semibold bg-[#CFB3AD]/10" : ""
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="icon" aria-label="Search" className="text-[#5D1B12] hover:text-[#833712] hover:bg-[#CFB3AD]/10">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Account" className="text-[#5D1B12] hover:text-[#833712] hover:bg-[#CFB3AD]/10">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative text-[#5D1B12] hover:text-[#833712] hover:bg-[#CFB3AD]/10" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B28882] text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-[#5D1B12] hover:text-[#833712] hover:bg-[#CFB3AD]/10" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-[#CFB3AD]/30 overflow-y-auto">
              <div className="text-xl font-semibold tracking-tight text-[#5D1B12] py-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[#833712]" />Ayurveda
              </div>
              <nav className="flex flex-col mt-6">
                {navigation.map((item) => (
                  <div key={item.name} className="mb-4">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 py-2 px-1 transition-colors rounded-md",
                        location === item.href ? "text-[#702912] font-medium bg-[#CFB3AD]/10" : "text-[#5D1B12]"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                    
                    {item.megamenu && (
                      <div className="pl-6 mt-2 border-l-2 border-[#CFB3AD]/30">
                        {item.megamenu.map((section, idx) => (
                          <div key={idx} className="mb-3">
                            <h5 className="text-sm font-medium text-[#833712] mb-1">{section.title}</h5>
                            <ul className="space-y-1">
                              {section.items.map((subitem, subidx) => (
                                <li key={subidx}>
                                  <Link
                                    href={subitem.href}
                                    className="block text-sm py-1 text-[#702912]/80 hover:text-[#833712]"
                                  >
                                    {subitem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

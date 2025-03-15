import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, LogOut, Sparkles, Droplets, Flame, Leaf, Heart, Users, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

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
          { name: "Lip Care", href: "/face/lip-care" },
        ],
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Skin", href: "/face/vata" },
          { name: "For Pitta Skin", href: "/face/pitta" },
          { name: "For Kapha Skin", href: "/face/kapha" },
          { name: "For Combination", href: "/face/combination" },
        ],
      },
      {
        title: "Concerns",
        items: [
          { name: "Anti-Aging", href: "/face/anti-aging" },
          { name: "Acne & Blemishes", href: "/face/acne-blemishes" },
          { name: "Hyperpigmentation", href: "/face/hyperpigmentation" },
          { name: "Sensitive Skin", href: "/face/sensitive-skin" },
        ],
      },
    ],
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
          { name: "Scalp Treatments", href: "/hair/scalp-treatments" },
        ],
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Hair", href: "/hair/vata" },
          { name: "For Pitta Hair", href: "/hair/pitta" },
          { name: "For Kapha Hair", href: "/hair/kapha" },
        ],
      },
      {
        title: "Concerns",
        items: [
          { name: "Hair Fall", href: "/hair/hair-fall" },
          { name: "Dandruff", href: "/hair/dandruff" },
          { name: "Dry & Damaged", href: "/hair/dry-damaged" },
          { name: "Premature Graying", href: "/hair/premature-graying" },
        ],
      },
    ],
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
          { name: "Hand & Foot Care", href: "/body/hand-foot" },
        ],
      },
      {
        title: "Dosha-Specific",
        items: [
          { name: "For Vata Body", href: "/body/vata" },
          { name: "For Pitta Body", href: "/body/pitta" },
          { name: "For Kapha Body", href: "/body/kapha" },
        ],
      },
      {
        title: "Specialty Products",
        items: [
          { name: "Massage Oils", href: "/body/massage-oils" },
          { name: "Ubtan & Clay Packs", href: "/body/ubtan-clay" },
          { name: "Bath Salts", href: "/body/bath-salts" },
        ],
      },
    ],
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
          { name: "Immunity Boosters", href: "/wellness/immunity" },
        ],
      },
      {
        title: "Dosha Balance",
        items: [
          { name: "Vata Balance", href: "/wellness/vata" },
          { name: "Pitta Balance", href: "/wellness/pitta" },
          { name: "Kapha Balance", href: "/wellness/kapha" },
          { name: "Tri-Dosha", href: "/wellness/tri-dosha" },
        ],
      },
      {
        title: "Mind & Spirit",
        items: [
          { name: "Meditation Aids", href: "/wellness/meditation" },
          { name: "Aromatherapy", href: "/wellness/aromatherapy" },
          { name: "Stress Relief", href: "/wellness/stress-relief" },
          { name: "Sleep Support", href: "/wellness/sleep" },
        ],
      },
    ],
  },
  { name: "Combos", href: "/combos", icon: <Heart className="w-4 h-4 mr-2" /> },
  {
    name: "Consultation",
    href: "/consultation",
    icon: <Users className="w-4 h-4 mr-2" />,
  },
  {
    name: "Know your Dosha",
    href: "/know-your-dosha",
    icon: <Wind className="w-4 h-4 mr-2" />,
  },
];

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-[#5D1B12]">Ayurveda</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/shop">
            <span className="text-sm font-medium hover:text-[#833712] transition-colors">Shop</span>
          </Link>
          <Link href="/about">
            <span className="text-sm font-medium hover:text-[#833712] transition-colors">About</span>
          </Link>
          <Link href="/consultation">
            <span className="text-sm font-medium hover:text-[#833712] transition-colors">Consultation</span>
          </Link>
          <Link href="/dosha-quiz">
            <span className="text-sm font-medium hover:text-[#833712] transition-colors">Dosha Quiz</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
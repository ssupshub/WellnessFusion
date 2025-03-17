import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Leaf, Star, Badge, Smile } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#B28882]/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#833712]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-[#5D1B12] rounded-full shadow-lg shadow-[#5D1B12]/20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#833712] rounded-full shadow-lg shadow-[#833712]/20"></div>
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#B28882] rounded-full shadow-lg shadow-[#B28882]/20"></div>
      
      <div className="container mx-auto px-4">
        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F8F0EE] px-4 py-2 rounded-full text-[#833712] font-medium text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Elevate your well-being</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6 text-[#5D1B12]">
              Modern wellness, <br />
              <span className="font-medium">Ancient wisdom</span>
            </h1>
            
            <p className="text-lg text-[#702912] mb-8 max-w-lg">
              Experience the transformative power of Ayurveda combined with cutting-edge technology for a personalized wellness journey.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Button asChild className="bg-[#5D1B12] text-white px-8 py-6 rounded-full font-medium hover:bg-[#702912] transition-colors h-auto">
                <Link href="/know-your-dosha">
                  <span className="flex items-center gap-2">
                    Discover Your Dosha
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="bg-white border-[#B28882] text-[#5D1B12] px-8 py-6 rounded-full font-medium hover:bg-[#CFB3AD]/10 hover:border-[#833712] transition-colors h-auto">
                <Link href="/face">
                  <span className="flex items-center gap-2">
                    Shop Products
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>
            
            {/* Stats section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <div className="flex justify-center mb-2">
                  <Leaf className="h-5 w-5 text-[#833712]" />
                </div>
                <p className="text-2xl font-semibold text-[#5D1B12]">100%</p>
                <p className="text-xs text-[#702912]">Natural</p>
              </div>
              
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <div className="flex justify-center mb-2">
                  <Star className="h-5 w-5 text-[#833712]" />
                </div>
                <p className="text-2xl font-semibold text-[#5D1B12]">5000+</p>
                <p className="text-xs text-[#702912]">Reviews</p>
              </div>
              
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <div className="flex justify-center mb-2">
                  <Smile className="h-5 w-5 text-[#833712]" />
                </div>
                <p className="text-2xl font-semibold text-[#5D1B12]">98%</p>
                <p className="text-xs text-[#702912]">Satisfied</p>
              </div>
            </div>
          </motion.div>
          
          {/* Hero images grid */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-12 grid-rows-10 gap-4 h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Main large image */}
            <div className="col-span-8 row-span-10 relative rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1538998073820-4dfa76300194?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Ayurvedic products and herbs" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 rounded-b-3xl text-white bg-gradient-to-t from-[#5D1B12]/80 to-transparent">
                <span className="text-sm font-medium bg-[#B28882] px-3 py-1 rounded-full">Featured</span>
                <h3 className="text-xl font-medium mt-2">Skin Harmony Collection</h3>
                <p className="text-sm opacity-90">Balance your dosha with our new skincare lineup</p>
              </div>
            </div>
            
            {/* Top smaller image */}
            <div className="col-span-4 row-span-5 relative rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://plus.unsplash.com/premium_photo-1661756453437-0dc2df3b3a19?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Woman during ayurvedic treatment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#833712]/60 to-transparent flex items-end p-4">
                <h4 className="text-white text-sm font-medium">Consultation Services</h4>
              </div>
            </div>
            
            {/* Bottom smaller image */}
            <div className="col-span-4 row-span-5 relative rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1532091710512-26fd3b2dcf16?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Ayurvedic herbs and ingredients" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#833712]/60 to-transparent flex items-end p-4">
                <h4 className="text-white text-sm font-medium">Herbal Remedies</h4>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Brand partners section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-[#CFB3AD]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <p className="text-[#702912] text-sm">TRUSTED BY PREMIUM WELLNESS BRANDS</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            <div className="text-[#833712]/70 font-semibold">Herb Life</div>
            <div className="text-[#833712]/70 font-semibold">AyurVedic+</div>
            <div className="text-[#833712]/70 font-semibold">NaturEssence</div>
            <div className="text-[#833712]/70 font-semibold">HolisticHerbs</div>
            <div className="text-[#833712]/70 font-semibold">VedaTrust</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

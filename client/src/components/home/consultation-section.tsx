import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  MessageSquare, 
  Calendar, 
  Video, 
  Clock, 
  Shield, 
  Sparkles, 
  Send, 
  CheckCircle2,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Practitioner } from "@shared/schema";

export default function ConsultationSection() {
  const { data: practitioners, isLoading, error } = useQuery({
    queryKey: ['/api/practitioners'],
  });

  return (
    <section id="consultation" className="py-20 bg-gradient-to-b from-white to-[#F8F0EE]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#833712] uppercase tracking-wider">Expert Guidance</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4 text-[#5D1B12]">
            Virtual <span className="font-medium">Consultations</span>
          </h2>
          <p className="text-[#702912] max-w-2xl mx-auto">
            Connect with certified Ayurvedic practitioners for personalized wellness plans.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-[#CFB3AD]/30 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-[#CFB3AD]/30 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-[#CFB3AD]/30 rounded animate-pulse w-24 mb-3"></div>
                  <div className="h-16 bg-[#CFB3AD]/30 rounded animate-pulse mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-[#CFB3AD]/30 rounded animate-pulse w-20"></div>
                    <div className="h-8 bg-[#CFB3AD]/30 rounded-full animate-pulse w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-[#5D1B12]">Failed to load practitioners. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {practitioners?.map((practitioner: Practitioner) => (
              <Card 
                key={practitioner.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    src={practitioner.imageUrl} 
                    alt={practitioner.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#833712] hover:bg-white">
                      <Star className="h-3 w-3 mr-1 fill-[#833712] text-[#833712]" /> 4.9
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex gap-2">
                      <Badge className="bg-[#833712] hover:bg-[#702912]">
                        <Video className="h-3 w-3 mr-1" /> Virtual
                      </Badge>
                      <Badge className="bg-[#5D1B12] hover:bg-[#702912]">
                        <span className="text-xs">{practitioner.duration} min</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-xl mb-1 text-[#5D1B12] group-hover:text-[#833712] transition-colors">
                        {practitioner.name}
                      </h3>
                      <p className="text-[#833712] mb-1 flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        {practitioner.title}
                      </p>
                    </div>
                    <span className="font-semibold text-[#702912] bg-[#F8F0EE] px-3 py-1 rounded-full text-sm">
                      ${practitioner.price}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#702912]/80 mb-4 line-clamp-3">{practitioner.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-xs text-[#702912]">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-[#833712]" />
                      <span>Dosha Analysis</span>
                    </div>
                    <div className="flex items-center text-xs text-[#702912]">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-[#833712]" />
                      <span>Personalized Plan</span>
                    </div>
                    <div className="flex items-center text-xs text-[#702912]">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-[#833712]" />
                      <span>Diet Consultation</span>
                    </div>
                    <div className="flex items-center text-xs text-[#702912]">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-[#833712]" />
                      <span>Follow-up Session</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-[#702912]/80 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Next available: Today</span>
                    </div>
                    <Button asChild className="bg-[#5D1B12] text-white hover:bg-[#833712] rounded-full">
                      <Link href="/consultation">
                        <span className="flex items-center text-sm">
                          Book Now
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
        
        {/* AI Chat Assistant */}
        <motion.div 
          className="mt-20 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#F8F0EE]">
              <div className="inline-flex items-center gap-2 bg-[#833712]/10 text-[#833712] font-medium text-sm px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Support</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-light mt-3 mb-4 text-[#5D1B12]">
                Meet <span className="font-medium relative">
                  AyurBot
                  <span className="absolute top-0 -right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </span>
              </h3>
              
              <p className="text-[#702912]/80 mb-8 max-w-lg">
                Get instant answers to your wellness questions, daily tips based on your dosha type, and product recommendations from our AI assistant trained on ancient Ayurvedic wisdom.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-[#F8F0EE] rounded-full flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 text-[#833712]" />
                  </div>
                  <h4 className="font-medium text-[#5D1B12] mb-1">24/7 Support</h4>
                  <p className="text-sm text-[#702912]/80">Always available for your wellness journey</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-[#F8F0EE] rounded-full flex items-center justify-center mb-3">
                    <Shield className="h-5 w-5 text-[#833712]" />
                  </div>
                  <h4 className="font-medium text-[#5D1B12] mb-1">Personalized</h4>
                  <p className="text-sm text-[#702912]/80">Dosha-specific guidance just for you</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-[#5D1B12] text-white py-3 px-6 rounded-full font-medium hover:bg-[#833712] transition-colors h-auto flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat with AyurBot
                </Button>
                
                <Button variant="outline" className="border-[#B28882] text-[#5D1B12] bg-white/80 py-3 px-6 rounded-full font-medium hover:bg-[#CFB3AD]/10 hover:border-[#833712] transition-colors h-auto">
                  Learn more
                </Button>
              </div>
            </div>
            
            <div className="bg-[#5D1B12] p-6 md:p-10 flex items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#833712]/30 blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#B28882]/30 blur-xl"></div>
              
              {/* Chat interface */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-md w-full z-10">
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#833712] to-[#B28882] rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-[#5D1B12]">AyurBot</h4>
                      <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30">
                        <span className="text-xs">Online</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-[#702912]/70">Ayurvedic Wellness AI</p>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[240px] overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-[#CFB3AD]/50 scrollbar-track-transparent">
                  <div className="bg-[#F8F0EE] rounded-lg rounded-tl-none p-3 max-w-xs shadow-sm">
                    <p className="text-sm text-[#5D1B12]">Namaste! I'm your Ayurvedic wellness assistant. How can I help you today?</p>
                    <p className="text-[10px] text-right mt-1 text-[#702912]/50">9:45 AM</p>
                  </div>
                  
                  <div className="bg-[#833712]/10 rounded-lg rounded-tr-none p-3 max-w-xs ml-auto shadow-sm">
                    <p className="text-sm text-[#702912]">I've been feeling tired lately and my skin is very dry. What could this indicate?</p>
                    <p className="text-[10px] text-right mt-1 text-[#702912]/50">9:46 AM</p>
                  </div>
                  
                  <div className="bg-[#F8F0EE] rounded-lg rounded-tl-none p-3 max-w-xs shadow-sm">
                    <p className="text-sm text-[#5D1B12]">Those symptoms suggest Vata imbalance. I recommend our Vata Balancing Oil and warm foods like soups and stews. Would you like specific product recommendations?</p>
                    <p className="text-[10px] text-right mt-1 text-[#702912]/50">9:46 AM</p>
                  </div>
                  
                  <div className="bg-[#833712]/10 rounded-lg rounded-tr-none p-3 max-w-xs ml-auto shadow-sm">
                    <p className="text-sm text-[#702912]">Yes, please recommend some products for me.</p>
                    <p className="text-[10px] text-right mt-1 text-[#702912]/50">9:47 AM</p>
                  </div>
                  
                  <div className="bg-[#F8F0EE] rounded-lg rounded-tl-none p-3 max-w-xs shadow-sm">
                    <p className="text-sm text-[#5D1B12]">I recommend the Vata Balancing Collection which includes our Nourishing Oil, Hydrating Face Cream, and Warming Tea Blend...</p>
                    <p className="text-[10px] text-right mt-1 text-[#702912]/50">9:47 AM</p>
                  </div>
                </div>
                
                <div className="mt-4 flex shadow-sm rounded-full overflow-hidden border border-[#CFB3AD]">
                  <input 
                    type="text" 
                    placeholder="Ask about your wellness concerns..." 
                    className="flex-1 py-3 px-4 text-sm focus:outline-none"
                  />
                  <button className="bg-gradient-to-r from-[#5D1B12] to-[#833712] text-white px-5 flex items-center">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

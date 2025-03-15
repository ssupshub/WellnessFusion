import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
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
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load practitioners. Please try again later.</p>
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
                className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    src={practitioner.imageUrl} 
                    alt={practitioner.name} 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-medium text-xl mb-1 text-[#5D1B12]">{practitioner.name}</h3>
                  <p className="text-[#833712] mb-3">{practitioner.title}</p>
                  <p className="text-sm text-[#702912]/80 mb-4">{practitioner.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#702912]">${practitioner.price} / {practitioner.duration} min</span>
                    <Button asChild>
                      <Link href="/consultation">
                        <span className="bg-[#5D1B12] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#833712] transition-colors">
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
        <div className="mt-16 bg-[#F8F0EE] rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-sm font-semibold text-[#833712] uppercase tracking-wider">AI-Powered Support</span>
              <h3 className="text-2xl md:text-3xl font-light mt-3 mb-4 text-[#5D1B12]">
                Meet <span className="font-medium">AyurBot</span>
              </h3>
              <p className="text-[#702912]/80 mb-6">
                Get instant answers to your wellness questions, daily tips based on your dosha type, and product recommendations from our AI assistant.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#833712] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#702912]">24/7 wellness guidance</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#833712] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#702912]">Personalized dosha-specific advice</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#833712] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#702912]">Product recommendations</span>
                </li>
              </ul>
              <Button className="bg-[#5D1B12] text-white px-6 py-3 rounded-full font-medium hover:bg-[#833712] transition-colors h-auto self-start">
                Chat with AyurBot
              </Button>
            </div>
            <div className="bg-gradient-to-br from-[#CFB3AD]/30 to-[#B28882]/20 p-6 md:p-12 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 max-w-md w-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#833712] rounded-full flex items-center justify-center mr-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#5D1B12]">AyurBot</h4>
                    <p className="text-xs text-[#702912]/70">AI Wellness Assistant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#F8F0EE] rounded-lg rounded-tl-none p-3 max-w-xs">
                    <p className="text-sm text-[#5D1B12]">Hello! I'm your Ayurvedic wellness assistant. How can I help you today?</p>
                  </div>
                  <div className="bg-[#833712]/10 rounded-lg rounded-tr-none p-3 max-w-xs ml-auto">
                    <p className="text-sm text-[#702912]">I've been feeling tired lately and my skin is dry.</p>
                  </div>
                  <div className="bg-[#F8F0EE] rounded-lg rounded-tl-none p-3 max-w-xs">
                    <p className="text-sm text-[#5D1B12]">Those symptoms suggest Vata imbalance. I recommend our Vata Balancing Oil and these dietary adjustments...</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <input 
                    type="text" 
                    placeholder="Type your question..." 
                    className="flex-1 border border-[#CFB3AD] rounded-l-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#B28882]"
                  />
                  <button className="bg-[#833712] text-white rounded-r-full px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

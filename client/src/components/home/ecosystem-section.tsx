
import { Globe, Users, Zap, Leaf } from "lucide-react";

export default function EcosystemSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F8F0EE] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-4">
            Future-Proof <span className="font-medium">Ecosystem</span>
          </h2>
          <p className="text-[#702912]/70 max-w-2xl mx-auto">
            Join our growing community of wellness enthusiasts and practitioners in building a sustainable Ayurvedic ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-[#5D1B12] rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Global Community</h3>
            <p className="text-[#702912]/70">Connect with practitioners and enthusiasts worldwide</p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-[#833712] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Expert Network</h3>
            <p className="text-[#702912]/70">Access verified Ayurvedic practitioners and specialists</p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-[#B28882] rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Smart Integration</h3>
            <p className="text-[#702912]/70">IoT-ready platform for wellness tracking and monitoring</p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-[#CFB3AD] rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Sustainable Growth</h3>
            <p className="text-[#702912]/70">Eco-friendly practices and responsible sourcing</p>
          </div>
        </div>
      </div>
    </section>
  );
}

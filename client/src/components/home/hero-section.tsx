import { Link } from "wouter";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-16 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Modern wellness, <br />
              <span className="font-medium">Ancient wisdom</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Experience the transformative power of Ayurveda combined with cutting-edge technology for a personalized wellness journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/know-your-dosha">
                <a className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Discover Your Dosha
                </a>
              </Link>
              <Link href="/face">
                <a className="bg-secondary text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  Shop Products
                </a>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-96 lg:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1611074818734-18de3c982691?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Ayurvedic products and herbs" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 hero-gradient rounded-b-3xl text-white bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-sm font-medium bg-[#34c759] px-3 py-1 rounded-full">Featured</span>
              <h3 className="text-xl font-medium mt-2">Skin Harmony Collection</h3>
              <p className="text-sm opacity-90">Balance your dosha with our new skincare lineup</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#34c759]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#5ac8fa]/10 rounded-full blur-3xl"></div>
    </section>
  );
}

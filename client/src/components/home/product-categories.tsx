import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
};

export default function ProductCategories() {
  // In a real application, you would fetch this data from an API
  const categories: Category[] = [
    {
      id: "1",
      name: "Face",
      description: "Natural skincare for radiance",
      imageUrl: "https://images.unsplash.com/photo-1631730359585-38a4935811d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      slug: "face"
    },
    {
      id: "2",
      name: "Hair",
      description: "Strengthen from root to tip",
      imageUrl: "https://images.unsplash.com/photo-1586335963805-f5cabc5d3cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      slug: "hair"
    },
    {
      id: "3",
      name: "Body",
      description: "Nourish your entire being",
      imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      slug: "body"
    },
    {
      id: "4",
      name: "Wellness",
      description: "Balance your inner ecosystem",
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      slug: "wellness"
    }
  ];

  return (
    <section id="categories" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#833712] uppercase tracking-wider">Collections</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4 text-[#5D1B12]">
            Shop by <span className="font-medium">Category</span>
          </h2>
          <p className="text-[#702912] max-w-2xl mx-auto">
            Discover products curated specifically for your dosha type and wellness needs.
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/${category.slug}`}>
              <motion.div 
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img 
                  src={category.imageUrl} 
                  alt={`${category.name} care products`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D1B12]/70 to-transparent flex items-end p-5">
                  <div>
                    <h3 className="text-white text-xl font-medium mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

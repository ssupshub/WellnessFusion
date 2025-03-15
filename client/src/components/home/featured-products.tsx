import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/star";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function FeaturedProducts() {
  const { toast } = useToast();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['/api/products/bestsellers'],
  });

  const handleAddToCart = async (productId: number) => {
    try {
      await apiRequest('POST', '/api/cart', {
        userId: 1, // Normally this would come from auth context
        productId,
        quantity: 1
      });
      
      toast({
        title: "Product added to cart",
        description: "Check your cart to complete the purchase",
      });
    } catch (error) {
      toast({
        title: "Failed to add product",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="featured-products" className="py-16 bg-[#F8F0EE]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-sm font-semibold text-[#833712] uppercase tracking-wider">Discover</span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 text-[#5D1B12]">
              Bestselling <span className="font-medium">Products</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 hover:text-[#833712]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 hover:text-[#833712]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-5">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load products. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {products?.map((product: Product) => (
              <Card key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-60 object-cover"
                  />
                  {product.isBestseller && (
                    <span className="absolute top-3 left-3 bg-[#833712] text-white text-xs px-2 py-1 rounded-full">
                      Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#B28882] text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-[#833712]">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                      <h3 className="font-medium text-[#5D1B12]">{product.name}</h3>
                    </div>
                    <span className="font-semibold text-[#702912]">${product.price}</span>
                  </div>
                  <p className="text-sm text-[#702912]/80 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <Rating rating={product.rating} />
                    <Button 
                      size="icon" 
                      className="bg-[#5D1B12] text-white rounded-full hover:bg-[#833712]"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/face">
            <Button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors h-auto">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

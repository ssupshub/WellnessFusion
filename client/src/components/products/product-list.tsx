import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/star";
import { Plus, Filter, ArrowUpDown, Star, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductListProps {
  category: string;
  title: string;
  description: string;
  doshaFilter?: string;
}

export default function ProductList({ category, title, description, doshaFilter }: ProductListProps) {
  const { toast } = useToast();
  
  const queryKey = doshaFilter 
    ? ['/api/products/dosha', doshaFilter]
    : ['/api/products/category', category];
    
  const { data: products, isLoading, error } = useQuery({
    queryKey,
  });

  const handleAddToCart = async (productId: number) => {
    try {
      await apiRequest('POST', '/api/cart', {
        userId: 1, // Normally this would come from auth context
        productId,
        quantity: 1
      });
      
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
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
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-[#5D1B12]">
            {title} <span className="font-medium">Products</span>
          </h1>
          <p className="text-[#702912] max-w-3xl">
            {description}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 rounded-full">
            <Filter className="w-4 h-4 mr-2" /> 
            All Filters
          </Button>
          
          <Button variant="outline" className="border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 rounded-full">
            <BadgeIcon className="w-4 h-4 mr-2" /> 
            Bestsellers
          </Button>
          
          <Button variant="outline" className="border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 rounded-full">
            <Star className="w-4 h-4 mr-2" /> 
            Top Rated
          </Button>
          
          <div className="ml-auto">
            <Button variant="outline" className="border-[#B28882] text-[#5D1B12] hover:bg-[#CFB3AD]/10 rounded-full">
              <ArrowUpDown className="w-4 h-4 mr-2" /> 
              Sort by: Featured
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="h-60 bg-[#CFB3AD]/30 animate-pulse"></div>
                <CardContent className="p-5">
                  <div className="h-4 bg-[#CFB3AD]/30 rounded animate-pulse mb-2"></div>
                  <div className="h-5 bg-[#CFB3AD]/30 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-[#CFB3AD]/30 rounded animate-pulse w-3/4 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-[#CFB3AD]/30 rounded animate-pulse w-20"></div>
                    <div className="h-8 w-8 bg-[#CFB3AD]/30 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-[#5D1B12]">Failed to load products. Please try again later.</p>
          </div>
        ) : (
          <>
            {products?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#5D1B12]">No products found in this category.</p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {products?.map((product: Product) => (
                  <Card key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <Button className="w-full bg-[#5D1B12] hover:bg-[#833712] text-white" onClick={() => handleAddToCart(product.id)}>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isBestseller && (
                          <Badge className="bg-[#833712] hover:bg-[#833712]">
                            Bestseller
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-[#B28882] hover:bg-[#B28882]">
                            New
                          </Badge>
                        )}
                        {product.doshaType && (
                          <Badge variant="outline" className="bg-white/80 border-[#CFB3AD] text-[#5D1B12] hover:bg-white/90">
                            {product.doshaType}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-[#5D1B12] group-hover:text-[#833712] transition-colors">{product.name}</h3>
                          <p className="text-sm text-[#833712]">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        </div>
                        <span className="font-semibold text-[#702912]">${product.price}</span>
                      </div>
                      <p className="text-sm text-[#702912]/80 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <Rating rating={product.rating || 5} />
                        <Button 
                          size="sm" 
                          className="rounded-full bg-[#F8F0EE] hover:bg-[#CFB3AD]/50 text-[#5D1B12]"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
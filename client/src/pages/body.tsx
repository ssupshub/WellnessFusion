import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Rating } from "@/components/ui/star";
import { Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function Body() {
  const { toast } = useToast();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['/api/products/category/body'],
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
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light leading-tight mb-3">
            Body <span className="font-medium">Care</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nourish your entire being with our collection of Ayurvedic body care products designed for holistic wellness.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product: Product) => (
              <Card key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <Link href={`/product/${product.id}`}>
                  <div className="relative cursor-pointer">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-60 object-cover"
                    />
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-[#34c759] text-white text-xs px-2 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-[#5ac8fa] text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </Link>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-500">Body</span>
                      <h3 className="font-medium">{product.name}</h3>
                    </div>
                    <span className="font-semibold">${product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <Rating rating={product.rating} />
                    <Button 
                      size="icon" 
                      className="bg-black text-white rounded-full hover:bg-gray-800"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

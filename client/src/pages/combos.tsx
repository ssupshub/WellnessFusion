import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Rating } from "@/components/ui/star";
import { Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Combos() {
  const { toast } = useToast();
  
  // Sample data for combos page - in a real app, this would come from an API
  const comboProducts = [
    {
      id: 101,
      name: "Vata Balancing Set",
      description: "Complete routine for dry skin and hair, includes 3 products.",
      price: 99,
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      isBestseller: true,
      isNew: false,
      rating: 5,
      doshaType: "vata",
      products: ["Hydrating Face Oil", "Nourishing Hair Mask", "Grounding Body Oil"]
    },
    {
      id: 102,
      name: "Pitta Calming Collection",
      description: "Cooling and soothing products for sensitive and irritated skin.",
      price: 89,
      imageUrl: "https://images.unsplash.com/photo-1601612628452-9e99ced43524",
      isBestseller: false,
      isNew: true,
      rating: 4,
      doshaType: "pitta",
      products: ["Aloe Face Gel", "Cooling Hair Rinse", "Calendula Body Lotion"]
    },
    {
      id: 103,
      name: "Kapha Energizing Bundle",
      description: "Stimulating products to invigorate and detoxify body and mind.",
      price: 109,
      imageUrl: "https://images.unsplash.com/photo-1598454444604-59512e60e6a8",
      isBestseller: false,
      isNew: false,
      rating: 5,
      doshaType: "kapha",
      products: ["Exfoliating Facial Scrub", "Stimulating Scalp Treatment", "Invigorating Body Scrub"]
    },
    {
      id: 104,
      name: "Tri-Dosha Seasonal Reset",
      description: "Universal set to balance all doshas during seasonal transitions.",
      price: 129,
      imageUrl: "https://images.unsplash.com/photo-1556760544-74068565f05c",
      isBestseller: false,
      isNew: false,
      rating: 5,
      doshaType: "tri-dosha",
      products: ["All-Season Facial Oil", "Adaptogenic Supplements", "Herbal Tea Blend", "Essential Oil Blend"]
    }
  ];

  const handleAddToCart = async (productId: number) => {
    try {
      await apiRequest('POST', '/api/cart', {
        userId: 1, // Normally this would come from auth context
        productId,
        quantity: 1
      });
      
      toast({
        title: "Combo added to cart",
        description: "Check your cart to complete the purchase",
      });
    } catch (error) {
      toast({
        title: "Failed to add combo",
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
            Gift <span className="font-medium">Sets & Combos</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of products designed to work in harmony for a complete wellness experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comboProducts.map((combo) => (
            <Card key={combo.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <img 
                  src={combo.imageUrl} 
                  alt={combo.name} 
                  className="w-full h-64 object-cover"
                />
                {combo.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#34c759] text-white text-xs px-2 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
                {combo.isNew && (
                  <span className="absolute top-3 left-3 bg-[#5ac8fa] text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {combo.doshaType.charAt(0).toUpperCase() + combo.doshaType.slice(1)}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium">{combo.name}</h3>
                  <span className="font-semibold">${combo.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{combo.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {combo.products.map((product, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#34c759] mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <Rating rating={combo.rating} />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      asChild
                    >
                      <Link href="/product/123">View Details</Link>
                    </Button>
                    <Button 
                      size="icon" 
                      className="bg-black text-white rounded-full hover:bg-gray-800"
                      onClick={() => handleAddToCart(combo.id)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/star";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Share2,
  Leaf,
  DropletIcon,
  Wind,
  Flame
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await apiRequest('POST', '/api/cart', {
        userId: 1, // Normally this would come from auth context
        productId: product.id,
        quantity
      });
      
      toast({
        title: "Product added to cart",
        description: `${quantity} × ${product.name} added to your cart.`,
      });
      
      // Reset quantity
      setQuantity(1);
    } catch (error) {
      toast({
        title: "Failed to add product",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Helper function to get dosha icon
  const getDoshaIcon = (doshaType: string) => {
    switch (doshaType) {
      case 'vata':
        return <Wind className="h-5 w-5 text-[#5ac8fa]" />;
      case 'pitta':
        return <Flame className="h-5 w-5 text-[#ff9500]" />;
      case 'kapha':
        return <DropletIcon className="h-5 w-5 text-[#34c759]" />;
      default:
        return <Leaf className="h-5 w-5 text-[#34c759]" />;
    }
  };

  // Sample related products (in a real app, these would be fetched from API)
  const relatedProducts = [
    {
      id: 1,
      name: "Calming Face Mist",
      price: 425,
      category: "face",
      imageUrl: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14",
    },
    {
      id: 2,
      name: "Soothing Aloe Gel",
      price: 499,
      category: "face",
      imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
    },
    {
      id: 3,
      name: "Hydrating Serum",
      price: 299,
      category: "face",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    }
  ];

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
              <div className="h-10 bg-gray-100 animate-pulse rounded w-2/3"></div>
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link href="/face">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/${product.category}`} className="hover:text-gray-900">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <motion.img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-square"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-[#34c759] text-white text-sm px-3 py-1 rounded-full">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#5ac8fa] text-white text-sm px-3 py-1 rounded-full">
                New
              </span>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Rating rating={product.rating ?? 0} />
                <span className="text-gray-500">(32 reviews)</span>
              </div>
              <p className="text-2xl font-semibold mb-4">${product.price}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-gray-100/70 rounded-full px-3 py-1 mr-3">
                  {getDoshaIcon(product.doshaType || 'tri-dosha')}
                  <span className="ml-1 text-sm font-medium">
                    {product.doshaType === 'tri-dosha' 
                      ? 'All Doshas' 
                      : product.doshaType?.charAt(0).toUpperCase() + product.doshaType?.slice(1) || 'All Doshas'}
                  </span>
                </div>
                <span className="text-sm bg-[#34c759]/10 text-[#34c759] px-3 py-1 rounded-full font-medium">
                  In Stock
                </span>
              </div>
              
              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-full">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="h-8 w-8 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-black text-white rounded-full py-6 px-8 font-medium hover:bg-gray-800 transition-colors"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Product Attributes */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <Leaf className="h-5 w-5 text-[#34c759] mr-2" />
                  <div>
                    <span className="font-medium">100% Natural</span>
                    <p className="text-gray-500">Ayurvedic ingredients</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9500] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Toxin-Free</span>
                    <p className="text-gray-500">No harmful chemicals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-medium mb-4">About {product.name}</h3>
                    <p className="text-gray-600 mb-4">
                      Our {product.name} is specially formulated for {product.doshaType === 'tri-dosha' ? 'all dosha types' : `${product.doshaType} dosha types`}. This product helps balance your natural constitution while addressing specific concerns related to your dosha.
                    </p>
                    
                    <h4 className="font-medium mt-6 mb-2">Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Balances {product.doshaType === 'tri-dosha' ? 'all doshas' : `${product.doshaType} dosha`}</li>
                      <li>Made with traditional Ayurvedic herbs and ingredients</li>
                      <li>Free from harsh chemicals and synthetic fragrances</li>
                      <li>Sustainably sourced and cruelty-free</li>
                    </ul>
                    
                    <h4 className="font-medium mt-6 mb-2">Best For:</h4>
                    <p className="text-gray-600">
                      {product.doshaType === 'vata' && 'Dry skin types, cooler weather conditions, and addressing Vata imbalances like dryness and roughness.'}
                      {product.doshaType === 'pitta' && 'Sensitive skin types, warmer weather conditions, and addressing Pitta imbalances like inflammation and redness.'}
                      {product.doshaType === 'kapha' && 'Oily skin types, humid weather conditions, and addressing Kapha imbalances like congestion and excess oil.'}
                      {product.doshaType === 'tri-dosha' && 'All skin types, year-round use, and maintaining balance across all doshas.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-medium mb-4">Ingredients</h3>
                    <p className="text-gray-600 mb-6">
                      We use only the highest quality Ayurvedic ingredients, ethically sourced and carefully selected to balance your dosha.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Key Ingredients:</h4>
                        <ul className="space-y-2 text-gray-600">
                          {product.doshaType === 'vata' && (
                            <>
                              <li className="flex items-start">
                                <span className="bg-[#5ac8fa]/10 text-[#5ac8fa] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Sesame Oil</span> - Deeply nourishing and warming for Vata types
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#5ac8fa]/10 text-[#5ac8fa] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Ashwagandha</span> - Calming adaptogen that helps reduce stress
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#5ac8fa]/10 text-[#5ac8fa] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Sweet Almond Oil</span> - Rich in vitamin E for deep hydration
                                </div>
                              </li>
                            </>
                          )}
                          
                          {product.doshaType === 'pitta' && (
                            <>
                              <li className="flex items-start">
                                <span className="bg-[#ff9500]/10 text-[#ff9500] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Aloe Vera</span> - Cooling and calming for irritated skin
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#ff9500]/10 text-[#ff9500] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Sandalwood</span> - Natural cooling agent that reduces inflammation
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#ff9500]/10 text-[#ff9500] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Neem Extract</span> - Purifying and antibacterial properties
                                </div>
                              </li>
                            </>
                          )}
                          
                          {product.doshaType === 'kapha' && (
                            <>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Ginger Extract</span> - Stimulating and warming
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Eucalyptus Oil</span> - Clarifying and invigorating
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Juniper Berry</span> - Detoxifying and stimulating
                                </div>
                              </li>
                            </>
                          )}
                          
                          {product.doshaType === 'tri-dosha' && (
                            <>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Triphala</span> - Ancient blend of three fruits that balance all doshas
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Rose Water</span> - Suitable for all doshas, cooling and hydrating
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-[#34c759]/10 text-[#34c759] p-1 rounded-full mr-2">•</span>
                                <div>
                                  <span className="font-medium">Tulsi (Holy Basil)</span> - Adaptogen that helps balance all constitutions
                                </div>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Full Ingredient List:</h4>
                        <p className="text-gray-600 text-sm">
                          Aqua, Glycerin (Vegetable), {product.doshaType === 'vata' && 'Sesamum Indicum (Sesame) Seed Oil, Withania Somnifera (Ashwagandha) Root Extract, Prunus Amygdalus Dulcis (Sweet Almond) Oil'}
                          {product.doshaType === 'pitta' && 'Aloe Barbadensis Leaf Juice, Santalum Album (Sandalwood) Oil, Azadirachta Indica (Neem) Leaf Extract'}
                          {product.doshaType === 'kapha' && 'Zingiber Officinale (Ginger) Root Extract, Eucalyptus Globulus Leaf Oil, Juniperus Communis Fruit Extract'}
                          {product.doshaType === 'tri-dosha' && 'Emblica Officinalis Fruit Extract, Terminalia Chebula Fruit Extract, Terminalia Belerica Fruit Extract, Rosa Damascena Flower Water, Ocimum Sanctum Leaf Extract'}, 
                          Cetearyl Alcohol (and) Cetearyl Glucoside, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Butyrospermum Parkii (Shea) Butter, Glyceryl Stearate, Tocopherol (Vitamin E), Helianthus Annuus (Sunflower) Seed Oil, Xanthan Gum, Sodium Stearoyl Lactylate, Sodium Benzoate, Potassium Sorbate, Citric Acid.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="how-to-use" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-medium mb-4">How to Use</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 font-medium mr-4">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Preparation</h4>
                          <p className="text-gray-600">
                            {product.category === 'face' && 'Begin with clean, slightly damp skin. We recommend using our gentle cleanser before application.'}
                            {product.category === 'hair' && 'Apply to damp hair after shampooing. Ensure hair is towel-dried but still moist.'}
                            {product.category === 'body' && 'Best applied after bathing when skin is still slightly damp to lock in moisture.'}
                            {product.category === 'wellness' && 'Take with a glass of warm water, preferably on an empty stomach unless otherwise directed.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 font-medium mr-4">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Application</h4>
                          <p className="text-gray-600">
                            {product.category === 'face' && 'Take a small amount (about the size of a pea) and warm between fingers. Gently apply to face using upward, circular motions.'}
                            {product.category === 'hair' && 'Section hair and apply product evenly from roots to ends. Use a wide-toothed comb for even distribution.'}
                            {product.category === 'body' && 'Massage in circular motions until fully absorbed. Focus on dry areas like elbows and knees.'}
                            {product.category === 'wellness' && 'Follow dosage instructions on the package. Typically 1-2 capsules daily unless otherwise specified.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 font-medium mr-4">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Frequency</h4>
                          <p className="text-gray-600">
                            {product.category === 'face' && 'Use morning and evening as part of your daily skincare routine.'}
                            {product.category === 'hair' && 'Use 2-3 times per week for best results.'}
                            {product.category === 'body' && 'Apply daily after showering or bathing.'}
                            {product.category === 'wellness' && 'Take daily for at least 30 days for optimal results.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 font-medium mr-4">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">For Best Results</h4>
                          <p className="text-gray-600">
                            Pair with other products in our {product.doshaType?.toUpperCase() || 'Ayurvedic'} line for a complete routine. Consistency is key to seeing results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Card key={item.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-500">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                    <span className="font-semibold">${item.price}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-full"
                      asChild
                    >
                      <Link href={`/product/${item.id}`}>View Product</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
};

export default function Cart() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  
  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ['/api/cart/1'], // using userId 1 for demo; in a real app, get from auth context
  });

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(itemId);
    
    try {
      await apiRequest('PUT', `/api/cart/${itemId}`, { quantity: newQuantity });
      
      // Invalidate the cart query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['/api/cart/1'] });
      
      toast({
        title: "Cart updated",
        description: "Your cart has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Failed to update cart",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    setIsUpdating(itemId);
    
    try {
      await apiRequest('DELETE', `/api/cart/${itemId}`);
      
      // Invalidate the cart query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['/api/cart/1'] });
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart."
      });
    } catch (error) {
      toast({
        title: "Failed to remove item",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const calculateSubtotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    
    return cartItems.reduce((total: number, item: CartItem) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    
    // Free shipping for orders over $100
    if (subtotal >= 100) return 0;
    
    // Basic shipping of $8.99
    return 8.99;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    return subtotal + shipping;
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout process initiated",
      description: "In a real application, you would be redirected to a payment page."
    });
  };

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block mx-auto">
              <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load your cart. Please try again later.</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          <Card className="rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild className="bg-black text-white rounded-full px-8 py-6 font-medium hover:bg-gray-800 transition-colors h-auto">
                <Link href="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">Cart</span>
        </div>
        
        <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="rounded-2xl mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[120px_1fr_auto] gap-4 font-medium text-gray-500 pb-4 border-b">
                  <div>Product</div>
                  <div>Details</div>
                  <div className="text-right">Total</div>
                </div>
                
                <AnimatePresence>
                  {cartItems.map((item: CartItem) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[120px_1fr_auto] gap-4 py-6 border-b last:border-0"
                    >
                      <div>
                        <Link href={`/product/${item.product.id}`}>
                          <div className="aspect-square rounded-xl overflow-hidden">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                      </div>
                      
                      <div>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium mb-1 hover:text-[#34c759] transition-colors cursor-pointer">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-4">
                          {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              disabled={isUpdating === item.id}
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              disabled={isUpdating === item.id}
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled={isUpdating === item.id}
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)} each</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">
                  <span className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                    Continue Shopping
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <Card className="rounded-2xl sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {calculateShipping() === 0 ? (
                        <span className="text-[#34c759]">Free</span>
                      ) : (
                        `$${calculateShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold text-lg">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                {calculateSubtotal() < 100 && (
                  <div className="bg-[#34c759]/10 text-[#34c759] p-3 rounded-lg mb-6 text-sm">
                    <p>Add ${(100 - calculateSubtotal()).toFixed(2)} more to get free shipping!</p>
                  </div>
                )}
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white rounded-full py-6 font-medium hover:bg-gray-800 transition-colors h-auto"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="mt-6 text-xs text-gray-500">
                  <p className="mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

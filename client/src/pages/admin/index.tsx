import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  Calendar, 
  MessageCircle,
  TrendingUp,
  HeartPulse
} from "lucide-react";
import BackOfficeLayout from "@/components/layout/backoffice-layout";

export default function AdminDashboard() {
  // These would be real queries in a production app
  const { data: products } = useQuery({
    queryKey: ['/api/products'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: practitioners } = useQuery({
    queryKey: ['/api/practitioners'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <BackOfficeLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#5D1B12]">Dashboard</h1>
          <p className="text-[#833712]/70">Welcome to your Ayurveda admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5D1B12]/70">
                Total Products
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#833712]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#5D1B12]">
                {products?.length || 0}
              </div>
              <p className="text-xs text-[#5D1B12]/70 mt-1">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5D1B12]/70">
                Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#833712]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#5D1B12]">
                $12,234
              </div>
              <p className="text-xs text-[#5D1B12]/70 mt-1">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5D1B12]/70">
                Practitioners
              </CardTitle>
              <HeartPulse className="h-4 w-4 text-[#833712]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#5D1B12]">
                {practitioners?.length || 0}
              </div>
              <p className="text-xs text-[#5D1B12]/70 mt-1">
                Active practitioners
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5D1B12]/70">
                Customers
              </CardTitle>
              <Users className="h-4 w-4 text-[#833712]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#5D1B12]">
                584
              </div>
              <p className="text-xs text-[#5D1B12]/70 mt-1">
                <span className="text-green-500">+8%</span> new users
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent">
          <TabsList className="bg-[#CFB3AD]/10 text-[#5D1B12]">
            <TabsTrigger value="recent" className="data-[state=active]:bg-white">Recent Orders</TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-white">Popular Products</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-white">Recent Consultations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-6">
            <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
              <CardHeader>
                <CardTitle className="text-[#5D1B12]">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-[#CFB3AD]/20">
                  <div className="grid grid-cols-5 bg-[#CFB3AD]/10 p-3 text-sm font-medium text-[#5D1B12]">
                    <div>Order</div>
                    <div>Customer</div>
                    <div>Products</div>
                    <div>Total</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y divide-[#CFB3AD]/10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-5 p-3 text-sm text-[#5D1B12]">
                        <div>ORD-{1000 + i}</div>
                        <div>Customer {i}</div>
                        <div>{i + 1} items</div>
                        <div>${(49.99 * i).toFixed(2)}</div>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'bg-green-500' : 'bg-blue-500'}`} />
                          {i % 3 === 0 ? 'Processing' : i % 3 === 1 ? 'Completed' : 'Shipped'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
              <CardHeader>
                <CardTitle className="text-[#5D1B12]">Popular Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-[#CFB3AD]/20">
                  <div className="grid grid-cols-4 bg-[#CFB3AD]/10 p-3 text-sm font-medium text-[#5D1B12]">
                    <div>Product</div>
                    <div>Category</div>
                    <div>Sales</div>
                    <div>Revenue</div>
                  </div>
                  <div className="divide-y divide-[#CFB3AD]/10">
                    {products?.slice(0, 5).map((product, i) => (
                      <div key={i} className="grid grid-cols-4 p-3 text-sm text-[#5D1B12]">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-[#CFB3AD]/20 flex items-center justify-center">
                            <Package className="h-4 w-4 text-[#833712]" />
                          </div>
                          <span>{product.name}</span>
                        </div>
                        <div>{product.category}</div>
                        <div>{Math.floor(Math.random() * 100) + 20} units</div>
                        <div>${((Math.random() * 1000) + 200).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-white shadow-sm border-[#CFB3AD]/20">
              <CardHeader>
                <CardTitle className="text-[#5D1B12]">Recent Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-[#CFB3AD]/20">
                  <div className="grid grid-cols-4 bg-[#CFB3AD]/10 p-3 text-sm font-medium text-[#5D1B12]">
                    <div>Date</div>
                    <div>Customer</div>
                    <div>Practitioner</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y divide-[#CFB3AD]/10">
                    {practitioners?.slice(0, 5).map((practitioner, i) => (
                      <div key={i} className="grid grid-cols-4 p-3 text-sm text-[#5D1B12]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#833712]" />
                          <span>Mar {10 + i}, 2025</span>
                        </div>
                        <div>Customer {i + 1}</div>
                        <div>{practitioner.name}</div>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${i % 3 === 0 ? 'bg-green-500' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-blue-500'}`} />
                          {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Upcoming' : 'In Progress'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BackOfficeLayout>
  );
}
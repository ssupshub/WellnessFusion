import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./pages/home";
import Face from "./pages/face";
import Hair from "./pages/hair";
import Body from "./pages/body";
import Wellness from "./pages/wellness";
import Combos from "./pages/combos";
import Consultation from "./pages/consultation";
import KnowYourDosha from "./pages/know-your-dosha";
import ProductDetail from "./pages/product-detail";
import Cart from "./pages/cart";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/face" component={Face} />
          <Route path="/hair" component={Hair} />
          <Route path="/body" component={Body} />
          <Route path="/wellness" component={Wellness} />
          <Route path="/combos" component={Combos} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/know-your-dosha" component={KnowYourDosha} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

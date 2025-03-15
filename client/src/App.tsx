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

// Face product subcategories
import FaceCleanserProducts from "./pages/face/cleansers";
import FaceMoisturizerProducts from "./pages/face/moisturizers";
import FaceSerumProducts from "./pages/face/serums";
import FaceMaskProducts from "./pages/face/masks";
import FacialOilProducts from "./pages/face/oils";

// Hair product subcategories
import HairShampooProducts from "./pages/hair/shampoos";
import HairConditionerProducts from "./pages/hair/conditioners";
import HairOilProducts from "./pages/hair/oils";
import HairTreatmentProducts from "./pages/hair/treatments";

// Body product subcategories
import BodyOilProducts from "./pages/body/oils";
import BodyScrubProducts from "./pages/body/scrubs";
import BodyLotionProducts from "./pages/body/lotions";

// Wellness product subcategories
import WellnessTeaProducts from "./pages/wellness/teas";
import WellnessSupplementProducts from "./pages/wellness/supplements";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          
          {/* Main category pages */}
          <Route path="/face" component={Face} />
          <Route path="/hair" component={Hair} />
          <Route path="/body" component={Body} />
          <Route path="/wellness" component={Wellness} />
          <Route path="/combos" component={Combos} />
          
          {/* Face subcategory routes */}
          <Route path="/face/cleansers" component={FaceCleanserProducts} />
          <Route path="/face/moisturizers" component={FaceMoisturizerProducts} />
          <Route path="/face/serums" component={FaceSerumProducts} />
          <Route path="/face/masks" component={FaceMaskProducts} />
          <Route path="/face/oils" component={FacialOilProducts} />
          
          {/* Hair subcategory routes */}
          <Route path="/hair/shampoos" component={HairShampooProducts} />
          <Route path="/hair/conditioners" component={HairConditionerProducts} />
          <Route path="/hair/oils" component={HairOilProducts} />
          <Route path="/hair/treatments" component={HairTreatmentProducts} />
          
          {/* Body subcategory routes */}
          <Route path="/body/oils" component={BodyOilProducts} />
          <Route path="/body/scrubs" component={BodyScrubProducts} />
          <Route path="/body/lotions" component={BodyLotionProducts} />
          
          {/* Wellness subcategory routes */}
          <Route path="/wellness/teas" component={WellnessTeaProducts} />
          <Route path="/wellness/supplements" component={WellnessSupplementProducts} />
          
          {/* Other pages */}
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

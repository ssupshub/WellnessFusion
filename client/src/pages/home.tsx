import HeroSection from "@/components/home/hero-section";
import DigitalDiagnostics from "@/components/home/digital-diagnostics";
import ProductCategories from "@/components/home/product-categories";
import FeaturedProducts from "@/components/home/featured-products";
import DoshaQuiz from "@/components/home/dosha-quiz";
import ConsultationSection from "@/components/home/consultation-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DigitalDiagnostics />
      <ProductCategories />
      <FeaturedProducts />
      <DoshaQuiz />
      <ConsultationSection />
    </div>
  );
}

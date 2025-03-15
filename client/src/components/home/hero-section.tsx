import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative bg-[#F9F5F3] py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-serif text-[#5D1B12]">
            Modern wellness,
            <br />
            <span className="text-[#833712]">Ancient wisdom</span>
          </h1>
          <p className="text-lg text-[#5D1B12]/80">
            Experience the transformative power of Ayurveda combined with cutting-edge technology for a personalized wellness journey.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/know-your-dosha" 
              className="bg-[#5D1B12] text-white px-6 py-3 rounded-full hover:bg-[#833712] transition"
            >
              Discover Your Dosha
            </Link>
            <Link 
              to="/products" 
              className="border border-[#5D1B12] text-[#5D1B12] px-6 py-3 rounded-full hover:bg-[#5D1B12] hover:text-white transition"
            >
              Shop Products
            </Link>
          </div>
          <div className="flex gap-12 mt-8">
            <div>
              <div className="text-2xl font-bold text-[#5D1B12]">100%</div>
              <div className="text-sm text-[#5D1B12]/70">Natural</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#5D1B12]">5000+</div>
              <div className="text-sm text-[#5D1B12]/70">Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#5D1B12]">98%</div>
              <div className="text-sm text-[#5D1B12]/70">Satisfied</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img 
              src="/images/products.jpg" 
              alt="Ayurvedic products and herbs" 
              className="rounded-2xl shadow-lg"
            />
            <img 
              src="/images/consultation.jpg" 
              alt="Woman during ayurvedic treatment" 
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="mt-8">
            <img 
              src="/images/herbs.jpg" 
              alt="Ayurvedic herbs and ingredients" 
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
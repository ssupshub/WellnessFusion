import { HoverEffect } from "../ui/card-hover-effect";
import { Shield, ClipboardList, Lock } from "lucide-react";

export default function DigitalDiagnostics() {
  const features = [
    {
      title: "Real-Time Analysis",
      description: "Non-invasive sensors combine with AI to provide accurate dosha assessment in minutes.",
      icon: <Shield className="h-6 w-6 text-[#5ac8fa]" />,
      bgClass: "bg-[#5ac8fa]/10"
    },
    {
      title: "Personalized Reports",
      description: "Get detailed insights and customized recommendations based on your unique biometric profile.",
      icon: <ClipboardList className="h-6 w-6 text-[#34c759]" />,
      bgClass: "bg-[#34c759]/10"
    },
    {
      title: "Secure Health Data",
      description: "Military-grade encryption ensures your biometric data and health information remain private.",
      icon: <Lock className="h-6 w-6 text-[#ff9500]" />,
      bgClass: "bg-[#ff9500]/10"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#34c759] uppercase tracking-wider">Advanced Technology</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4">
            NadiSense™ <span className="font-medium">Digital Diagnostics</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern interpretation of ancient Ayurvedic pulse diagnosis, powered by AI and biometric sensors.
          </p>
        </div>
        
        <HoverEffect items={features} />
        
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center text-[#5ac8fa] font-medium">
            Learn more about NadiSense™ Technology
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

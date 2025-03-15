import DoshaQuiz from "@/components/home/dosha-quiz";
import ConsultationSection from "@/components/home/consultation-section";
import EcosystemSection from "@/components/home/ecosystem-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConsultationSection />
      <EcosystemSection />
      <DoshaQuiz />
    </main>
  );
}
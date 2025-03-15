import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield } from "lucide-react";

type DoshaQuizQuestion = {
  id: number;
  question: string;
  vataOption: string;
  pittaOption: string;
  kaphaOption: string;
};

export default function DoshaQuiz() {
  const { toast } = useToast();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const { data: questions, isLoading } = useQuery({
    queryKey: ['/api/dosha-quiz'],
  });
  
  const handleAnswer = (questionId: number, doshaType: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: doshaType,
    }));
  };
  
  const handleContinue = () => {
    if (!questions) return;
    
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      // Submit quiz results
      toast({
        title: "Quiz completed!",
        description: "Processing your results...",
      });
      
      // This would send the answers to the backend for processing
      apiRequest('POST', '/api/dosha-quiz/result', { answers })
        .then(res => res.json())
        .then(data => {
          toast({
            title: `Your dominant dosha is ${data.dominantDosha.toUpperCase()}`,
            description: "Check your personalized recommendations",
          });
        })
        .catch(err => {
          toast({
            title: "Error processing results",
            description: "Please try again",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <section id="know-your-dosha" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-[#833712] uppercase tracking-wider">Personalized Wellness</span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4 text-[#5D1B12]">
              Know Your <span className="font-medium">Dosha</span>
            </h2>
            <p className="text-[#702912]/80 mb-6">
              According to Ayurveda, each person has a unique mix of three energies or doshas: Vata, Pitta, and Kapha. Understanding your dominant dosha is the first step to optimal wellness.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-[#833712]/10 p-2 rounded-lg mr-4">
                  <Sparkles className="h-6 w-6 text-[#833712]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-[#5D1B12]">Personalized Recommendations</h3>
                  <p className="text-sm text-[#702912]/80">Get customized product suggestions based on your constitution type.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#B28882]/20 p-2 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-[#702912]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-[#5D1B12]">Lifestyle Guidance</h3>
                  <p className="text-sm text-[#702912]/80">Discover daily routines, diet tips, and practices to balance your doshas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#CFB3AD]/30 p-2 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-[#833712]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-[#5D1B12]">Advanced Analysis</h3>
                  <p className="text-sm text-[#702912]/80">For deeper insights, connect with our NadiSense™ diagnostic technology.</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-[#5D1B12] text-white px-8 py-3 rounded-full font-medium hover:bg-[#833712] transition-colors h-auto">
              Take the Quiz
            </Button>
          </div>
          
          {/* Dosha Quiz Preview */}
          <Card className="bg-[#F8F0EE] rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-medium mb-6 text-[#5D1B12]">Quick Dosha Assessment</h3>
            
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-[#CFB3AD]/50 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-12 bg-[#CFB3AD]/50 rounded"></div>
                  <div className="h-12 bg-[#CFB3AD]/50 rounded"></div>
                  <div className="h-12 bg-[#CFB3AD]/50 rounded"></div>
                </div>
              </div>
            ) : questions && questions.length > 0 ? (
              <motion.div
                key={activeQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-0">
                  <p className="font-medium mb-3 text-[#5D1B12]">{questions[activeQuestion].question}</p>
                  <RadioGroup 
                    value={answers[questions[activeQuestion].id]}
                    className="space-y-3"
                    onValueChange={(value) => handleAnswer(questions[activeQuestion].id, value)}
                  >
                    <div className="flex items-center p-3 bg-white rounded-xl cursor-pointer border border-transparent hover:border-[#B28882] transition-colors">
                      <RadioGroupItem value="vata" id="vata" className="text-[#833712]" />
                      <Label htmlFor="vata" className="ml-3 cursor-pointer flex-1 text-[#702912]">
                        {questions[activeQuestion].vataOption}
                      </Label>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-xl cursor-pointer border border-transparent hover:border-[#B28882] transition-colors">
                      <RadioGroupItem value="pitta" id="pitta" className="text-[#833712]" />
                      <Label htmlFor="pitta" className="ml-3 cursor-pointer flex-1 text-[#702912]">
                        {questions[activeQuestion].pittaOption}
                      </Label>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-xl cursor-pointer border border-transparent hover:border-[#B28882] transition-colors">
                      <RadioGroupItem value="kapha" id="kapha" className="text-[#833712]" />
                      <Label htmlFor="kapha" className="ml-3 cursor-pointer flex-1 text-[#702912]">
                        {questions[activeQuestion].kaphaOption}
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="text-center mt-8">
                    <p className="text-sm text-[#702912]/70 mb-4">
                      Question {activeQuestion + 1} of {questions.length}
                    </p>
                    <Button 
                      onClick={handleContinue}
                      disabled={!answers[questions[activeQuestion].id]}
                      className="bg-[#5D1B12] text-white px-8 py-3 rounded-full font-medium hover:bg-[#833712] transition-colors h-auto"
                    >
                      {activeQuestion < questions.length - 1 ? "Continue" : "Get Results"}
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ) : (
              <p className="text-center text-[#702912]/70">No quiz questions available</p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

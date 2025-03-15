import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { Wind, Flame, Droplets } from "lucide-react";
import type { DoshaQuizQuestion, Product } from "@shared/schema";

type QuizState = "intro" | "quiz" | "results";

export default function KnowYourDosha() {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizResults, setQuizResults] = useState<{
    dominantDosha: string;
    vataCount: number;
    pittaCount: number;
    kaphaCount: number;
    recommendations: Product[];
  } | null>(null);

  const { data: questions, isLoading } = useQuery({
    queryKey: ['/api/dosha-quiz'],
  });

  const handleStartQuiz = () => {
    setQuizState("quiz");
    setActiveQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: number, doshaType: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: doshaType,
    }));
  };

  const handleNextQuestion = () => {
    if (!questions) return;
    
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      // Submit quiz results
      submitQuizResults();
    }
  };

  const submitQuizResults = async () => {
    try {
      toast({
        title: "Processing your answers",
        description: "Please wait while we analyze your dosha profile...",
      });

      const response = await apiRequest('POST', '/api/dosha-quiz/result', { answers });
      const data = await response.json();
      
      setQuizResults(data);
      setQuizState("results");
      
    } catch (error) {
      toast({
        title: "Error processing results",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const resetQuiz = () => {
    setQuizState("intro");
    setActiveQuestion(0);
    setAnswers({});
    setQuizResults(null);
  };

  // Information about each dosha
  const doshaInfo = {
    vata: {
      icon: <Wind className="h-10 w-10 text-[#5ac8fa]" />,
      color: "bg-[#5ac8fa]/10",
      name: "Vata",
      attributes: ["Creative", "Quick-thinking", "Adaptable", "Energetic", "Flexible"],
      description: "Vata is associated with air and space elements. When in balance, Vata types are creative, energetic, and flexible. When out of balance, they may experience anxiety, dry skin, and digestive issues.",
      balanceTips: [
        "Follow a regular daily routine",
        "Stay warm and avoid cold, dry environments",
        "Use warming, grounding oils and herbs",
        "Practice gentle, grounding exercises like yoga",
        "Favor warm, cooked, moist foods with healthy fats"
      ]
    },
    pitta: {
      icon: <Flame className="h-10 w-10 text-[#ff9500]" />,
      color: "bg-[#ff9500]/10",
      name: "Pitta",
      attributes: ["Focused", "Intelligent", "Driven", "Disciplined", "Articulate"],
      description: "Pitta is associated with fire and water elements. When in balance, Pitta types are focused, intelligent, and driven. When out of balance, they may experience inflammation, irritability, and skin sensitivity.",
      balanceTips: [
        "Avoid excessive heat and direct sunlight",
        "Practice moderation in exercise and work",
        "Include cooling foods and herbs in your diet",
        "Make time for relaxation and fun",
        "Use cooling, calming skincare products"
      ]
    },
    kapha: {
      icon: <Droplets className="h-10 w-10 text-[#34c759]" />,
      color: "bg-[#34c759]/10",
      name: "Kapha",
      attributes: ["Calm", "Strong", "Loyal", "Patient", "Nurturing"],
      description: "Kapha is associated with earth and water elements. When in balance, Kapha types are calm, strong, and nurturing. When out of balance, they may experience weight gain, lethargy, and congestion.",
      balanceTips: [
        "Stay active with regular, stimulating exercise",
        "Embrace variety and new experiences",
        "Use invigorating, detoxifying products",
        "Favor light, warm, spicy foods",
        "Rise early and maintain an active schedule"
      ]
    }
  };

  const renderIntro = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-4xl font-light leading-tight mb-6">
          Discover Your <span className="font-medium">Dosha Type</span>
        </h1>
        <p className="text-gray-600 mb-6">
          According to Ayurveda, each person has a unique mix of three energies or doshas: Vata, Pitta, and Kapha. Understanding your dominant dosha is the first step to optimal wellness.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`p-5 rounded-xl ${doshaInfo.vata.color}`}>
            <CardContent className="p-0 text-center">
              {doshaInfo.vata.icon}
              <h3 className="font-medium text-lg mt-3">Vata</h3>
              <p className="text-sm text-gray-600">Air & Space</p>
            </CardContent>
          </Card>
          
          <Card className={`p-5 rounded-xl ${doshaInfo.pitta.color}`}>
            <CardContent className="p-0 text-center">
              {doshaInfo.pitta.icon}
              <h3 className="font-medium text-lg mt-3">Pitta</h3>
              <p className="text-sm text-gray-600">Fire & Water</p>
            </CardContent>
          </Card>
          
          <Card className={`p-5 rounded-xl ${doshaInfo.kapha.color}`}>
            <CardContent className="p-0 text-center">
              {doshaInfo.kapha.icon}
              <h3 className="font-medium text-lg mt-3">Kapha</h3>
              <p className="text-sm text-gray-600">Earth & Water</p>
            </CardContent>
          </Card>
        </div>
        
        <p className="text-gray-600 mb-6">
          Our comprehensive quiz will analyze your physical characteristics, mental tendencies, and behavioral patterns to determine your unique dosha profile.
        </p>
        
        <Button
          onClick={handleStartQuiz}
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors h-auto"
        >
          Start Quiz
        </Button>
      </div>
      
      <div className="bg-secondary rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-medium mb-6">Why Knowing Your Dosha Matters</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-[#34c759]/10 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#34c759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Personalized Skincare</h4>
              <p className="text-sm text-gray-600">Get product recommendations specifically formulated for your skin's unique needs and tendencies.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#5ac8fa]/10 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5ac8fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Targeted Wellness</h4>
              <p className="text-sm text-gray-600">Understand which supplements, diets, and lifestyle practices will bring you into optimal balance.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#ff9500]/10 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Preventative Health</h4>
              <p className="text-sm text-gray-600">Learn which imbalances you're prone to and how to prevent them before symptoms occur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (isLoading || !questions || questions.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="inline-block mx-auto mb-4">
            <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      );
    }

    const currentQuestion = questions[activeQuestion] as DoshaQuizQuestion;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-sm font-semibold text-[#34c759] uppercase tracking-wider">Dosha Assessment</span>
          <h2 className="text-3xl font-light mt-2 mb-4">
            Question <span className="font-medium">{activeQuestion + 1}</span> of {questions.length}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-[#34c759] h-2 rounded-full" 
              style={{ width: `${((activeQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <CardContent className="p-8">
            <motion.div
              key={activeQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
              
              <RadioGroup 
                value={answers[currentQuestion.id]}
                className="space-y-4"
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              >
                <div className="flex items-center p-4 bg-[#5ac8fa]/5 rounded-xl cursor-pointer border border-transparent hover:border-[#5ac8fa]/30 transition-colors">
                  <RadioGroupItem value="vata" id={`vata-${currentQuestion.id}`} className="text-[#5ac8fa]" />
                  <Label htmlFor={`vata-${currentQuestion.id}`} className="ml-3 cursor-pointer flex-1 font-medium">
                    {currentQuestion.vataOption}
                    <p className="font-normal text-sm text-gray-500 mt-1">Vata characteristic</p>
                  </Label>
                </div>
                
                <div className="flex items-center p-4 bg-[#ff9500]/5 rounded-xl cursor-pointer border border-transparent hover:border-[#ff9500]/30 transition-colors">
                  <RadioGroupItem value="pitta" id={`pitta-${currentQuestion.id}`} className="text-[#ff9500]" />
                  <Label htmlFor={`pitta-${currentQuestion.id}`} className="ml-3 cursor-pointer flex-1 font-medium">
                    {currentQuestion.pittaOption}
                    <p className="font-normal text-sm text-gray-500 mt-1">Pitta characteristic</p>
                  </Label>
                </div>
                
                <div className="flex items-center p-4 bg-[#34c759]/5 rounded-xl cursor-pointer border border-transparent hover:border-[#34c759]/30 transition-colors">
                  <RadioGroupItem value="kapha" id={`kapha-${currentQuestion.id}`} className="text-[#34c759]" />
                  <Label htmlFor={`kapha-${currentQuestion.id}`} className="ml-3 cursor-pointer flex-1 font-medium">
                    {currentQuestion.kaphaOption}
                    <p className="font-normal text-sm text-gray-500 mt-1">Kapha characteristic</p>
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={resetQuiz}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id]}
                  className="bg-black text-white px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  {activeQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderResults = () => {
    if (!quizResults) return null;
    
    const { dominantDosha, vataCount, pittaCount, kaphaCount, recommendations } = quizResults;
    const totalQuestions = vataCount + pittaCount + kaphaCount;
    
    const dominantInfo = doshaInfo[dominantDosha as keyof typeof doshaInfo];
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#34c759] uppercase tracking-wider">Analysis Complete</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4">
            Your Dosha Profile: <span className="font-medium">{dominantInfo.name}</span> Dominant
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your answers, your constitution is primarily {dominantInfo.name}. Understanding your dosha can help you make better choices for your health and wellness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className={`rounded-2xl overflow-hidden ${dominantDosha === 'vata' ? 'ring-2 ring-[#5ac8fa]' : ''}`}>
            <div className="bg-[#5ac8fa]/10 p-6 text-center">
              <Wind className="h-12 w-12 text-[#5ac8fa] mx-auto" />
              <h3 className="text-xl font-medium mt-3">Vata</h3>
              <p className="text-sm text-gray-600 mt-1">Air & Space</p>
              <div className="mt-4 bg-white/50 rounded-full p-1">
                <div 
                  className="bg-[#5ac8fa] h-2 rounded-full" 
                  style={{ width: `${(vataCount / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-medium">{Math.round((vataCount / totalQuestions) * 100)}%</p>
            </div>
            <CardContent className="p-6">
              <h4 className="font-medium mb-3">Vata Characteristics:</h4>
              <ul className="space-y-1 text-sm">
                {doshaInfo.vata.attributes.map((attr, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="h-4 w-4 text-[#5ac8fa] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {attr}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className={`rounded-2xl overflow-hidden ${dominantDosha === 'pitta' ? 'ring-2 ring-[#ff9500]' : ''}`}>
            <div className="bg-[#ff9500]/10 p-6 text-center">
              <Flame className="h-12 w-12 text-[#ff9500] mx-auto" />
              <h3 className="text-xl font-medium mt-3">Pitta</h3>
              <p className="text-sm text-gray-600 mt-1">Fire & Water</p>
              <div className="mt-4 bg-white/50 rounded-full p-1">
                <div 
                  className="bg-[#ff9500] h-2 rounded-full" 
                  style={{ width: `${(pittaCount / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-medium">{Math.round((pittaCount / totalQuestions) * 100)}%</p>
            </div>
            <CardContent className="p-6">
              <h4 className="font-medium mb-3">Pitta Characteristics:</h4>
              <ul className="space-y-1 text-sm">
                {doshaInfo.pitta.attributes.map((attr, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="h-4 w-4 text-[#ff9500] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {attr}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className={`rounded-2xl overflow-hidden ${dominantDosha === 'kapha' ? 'ring-2 ring-[#34c759]' : ''}`}>
            <div className="bg-[#34c759]/10 p-6 text-center">
              <Droplets className="h-12 w-12 text-[#34c759] mx-auto" />
              <h3 className="text-xl font-medium mt-3">Kapha</h3>
              <p className="text-sm text-gray-600 mt-1">Earth & Water</p>
              <div className="mt-4 bg-white/50 rounded-full p-1">
                <div 
                  className="bg-[#34c759] h-2 rounded-full" 
                  style={{ width: `${(kaphaCount / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-medium">{Math.round((kaphaCount / totalQuestions) * 100)}%</p>
            </div>
            <CardContent className="p-6">
              <h4 className="font-medium mb-3">Kapha Characteristics:</h4>
              <ul className="space-y-1 text-sm">
                {doshaInfo.kapha.attributes.map((attr, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="h-4 w-4 text-[#34c759] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {attr}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="rounded-2xl overflow-hidden mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-medium mb-4">Understanding Your {dominantInfo.name} Dosha</h3>
            <p className="text-gray-600 mb-6">{dominantInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-lg mb-3">How to Balance Your {dominantInfo.name} Dosha</h4>
                <ul className="space-y-2">
                  {dominantInfo.balanceTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <svg className="h-5 w-5 text-[#34c759] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={dominantInfo.color + " rounded-xl p-6"}>
                <h4 className="font-medium text-lg mb-3">When Your {dominantInfo.name} Is In Balance</h4>
                <p className="text-gray-600 mb-4">You'll experience:</p>
                <ul className="space-y-1 text-gray-600">
                  {dominantDosha === 'vata' && (
                    <>
                      <li>• Creativity and adaptability</li>
                      <li>• Vibrant energy and enthusiasm</li>
                      <li>• Mental clarity and quick thinking</li>
                      <li>• Regular digestion and sleep patterns</li>
                      <li>• Balanced body temperature</li>
                    </>
                  )}
                  {dominantDosha === 'pitta' && (
                    <>
                      <li>• Strong digestion and metabolism</li>
                      <li>• Clear, focused thinking</li>
                      <li>• Effective leadership skills</li>
                      <li>• Glowing, radiant skin</li>
                      <li>• Balanced body temperature</li>
                    </>
                  )}
                  {dominantDosha === 'kapha' && (
                    <>
                      <li>• Steady, grounded energy</li>
                      <li>• Strong immunity and vitality</li>
                      <li>• Calm, patient temperament</li>
                      <li>• Deep, restful sleep</li>
                      <li>• Soft, glowing skin</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {recommendations && recommendations.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-medium mb-6">Recommended Products for Your Dosha</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <Card key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-[#34c759] text-white text-xs px-2 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm text-gray-500">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        <h3 className="font-medium">{product.name}</h3>
                      </div>
                      <span className="font-semibold">${product.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="rounded-full mr-4"
          >
            Retake Quiz
          </Button>
          
          <Button
            className="bg-black text-white px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
            asChild
          >
            <a href="/face">Shop for Your Dosha</a>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        {quizState === "intro" && renderIntro()}
        {quizState === "quiz" && renderQuiz()}
        {quizState === "results" && renderResults()}
      </div>
    </div>
  );
}

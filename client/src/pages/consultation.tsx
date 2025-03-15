import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import type { Practitioner } from "@shared/schema";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  practitionerId: z.string({
    required_error: "Please select a practitioner.",
  }),
  date: z.string({
    required_error: "Please select a consultation date.",
  }),
  time: z.string({
    required_error: "Please select a consultation time.",
  }),
  concerns: z.string().min(10, {
    message: "Please describe your concerns in at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Consultation() {
  const { toast } = useToast();
  const [availableDates] = useState(generateDateOptions());
  const [availableTimes] = useState(generateTimeOptions());
  
  const { data: practitioners, isLoading } = useQuery({
    queryKey: ['/api/practitioners'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      practitionerId: "",
      date: "",
      time: "",
      concerns: "",
    },
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "Consultation Booked!",
      description: "We'll send you a confirmation email shortly.",
    });
    
    console.log("Form submitted:", data);
    
    // In a real app, you would send this data to your backend
    // apiRequest('POST', '/api/consultations', data)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
    
    form.reset();
  }

  function generateDateOptions() {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) {
        continue;
      }
      
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  }

  function generateTimeOptions() {
    const times = [];
    
    // 9 AM to 5 PM with 30-minute intervals
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 17 && minute === 30) continue; // Skip 5:30 PM
        
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        let displayHour = hour;
        let ampm = 'AM';
        
        if (hour >= 12) {
          ampm = 'PM';
          if (hour > 12) displayHour = hour - 12;
        }
        
        const timeLabel = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
        
        times.push({
          value: timeValue,
          label: timeLabel
        });
      }
    }
    
    return times;
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light leading-tight mb-3">
            Book a <span className="font-medium">Consultation</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our certified Ayurvedic practitioners for a personalized wellness assessment and treatment plan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-secondary rounded-2xl overflow-hidden shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-medium mb-6">Why Consult With Us?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#34c759]/10 p-3 rounded-xl mr-4">
                    <User className="h-6 w-6 text-[#34c759]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Personalized Approach</h3>
                    <p className="text-gray-600">Each consultation is tailored to your specific constitution and health concerns, providing customized solutions rather than generic advice.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#5ac8fa]/10 p-3 rounded-xl mr-4">
                    <Calendar className="h-6 w-6 text-[#5ac8fa]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Holistic Assessment</h3>
                    <p className="text-gray-600">Our practitioners analyze your physical, mental, and emotional health patterns to address the root cause, not just symptoms.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ff9500]/10 p-3 rounded-xl mr-4">
                    <Clock className="h-6 w-6 text-[#ff9500]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Ongoing Support</h3>
                    <p className="text-gray-600">Receive continuous guidance with follow-up sessions and digital support to track your progress and adjust recommendations.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-lg mb-4">What to Expect</h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>A thorough assessment of your current health status and history</li>
                  <li>Dosha analysis and constitutional evaluation</li>
                  <li>Personalized nutrition and lifestyle recommendations</li>
                  <li>Custom product suggestions based on your needs</li>
                  <li>Follow-up plan to monitor your progress</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-medium mb-6">Book Your Session</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="practitionerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Practitioner</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a practitioner" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoading ? (
                                <SelectItem value="loading">Loading practitioners...</SelectItem>
                              ) : (
                                practitioners?.map((practitioner: Practitioner) => (
                                  <SelectItem 
                                    key={practitioner.id} 
                                    value={practitioner.id.toString()}
                                  >
                                    {practitioner.name} - {practitioner.title}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            ${form.watch("practitionerId") && practitioners ? 
                              practitioners.find(
                                (p: Practitioner) => p.id.toString() === form.watch("practitionerId")
                              )?.price || "" : ""} per session
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availableDates.map((date) => (
                                  <SelectItem key={date.value} value={date.value}>
                                    {date.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availableTimes.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="concerns"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Health Concerns & Questions</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your main health concerns or questions for the practitioner."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-black text-white hover:bg-gray-800 h-12 rounded-full"
                    >
                      Book Consultation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

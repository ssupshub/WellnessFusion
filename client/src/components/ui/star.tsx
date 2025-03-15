import { cn } from "@/lib/utils";

interface StarProps {
  filled?: boolean;
  className?: string;
}

export function Star({ filled = true, className }: StarProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("h-4 w-4", 
        filled ? "text-[#ff9500]" : "text-gray-300", 
        className
      )} 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function Rating({ rating, maxRating = 5, className }: RatingProps) {
  return (
    <div className={cn("flex", className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
}

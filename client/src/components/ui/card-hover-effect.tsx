import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    link?: string;
    linkText?: string;
    bgClass?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl bg-white/70 backdrop-blur border border-gray-100/20 hover:border-gray-100/30"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <div className={cn("bg-opacity-10 rounded-xl p-3 inline-block mb-4", item.bgClass || "bg-[#34c759]/10")}>
            {item.icon}
          </div>
          <h3 className="text-xl font-medium mb-2 relative z-10">{item.title}</h3>
          <p className="text-gray-600 relative z-10">{item.description}</p>
          
          {item.link && (
            <a 
              href={item.link} 
              className="inline-flex items-center text-[#5ac8fa] font-medium mt-4 relative z-10"
            >
              {item.linkText || "Learn more"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

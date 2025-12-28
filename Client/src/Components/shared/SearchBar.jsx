import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function SearchBar({
  children,
  onSearch,
  className,
  broweserFlag,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-24
        bg-white
        rounded-[28px]
        shadow-[0_20px_60px_rgba(99,102,241,0.18)]
        px-10
        py-8
        max-w-7xl
        mx-auto 
        ${className}
        `}
    >
      <div className="flex flex-col lg:flex-row gap-5">{children}</div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Search across textbooks, slides, exams, and courses.
        </p>
        {!broweserFlag && (
          <Button
            onClick={onSearch}
            className="h-[52px] px-10 rounded-2xl bg-gradient-to-br from-primary to-secondary"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        )}
      </div>
    </motion.div>
  );
}

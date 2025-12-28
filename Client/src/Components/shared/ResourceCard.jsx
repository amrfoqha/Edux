import {
  Star,
  Download,
  FileText,
  Video,
  BookOpen,
  Award,
  File,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import pdfThumbnail from "../../../public/images/pdf-placeholder.png";

const typeColors = {
  "Lecture Slides": "from-blue-400 to-blue-600",
  Textbook: "from-purple-400 to-purple-600",
  "Past Exam": "from-amber-400 to-amber-600",
  "Video Course": "from-rose-400 to-rose-600",
};

const typeBadgeColors = {
  "Lecture Slides": "bg-gradient-to-r from-blue-400 to-purple-500",
  Textbook: "bg-gradient-to-r from-purple-400 to-indigo-500",
  "Past Exam": "bg-gradient-to-r from-amber-400 to-orange-500",
  "Video Course": "bg-gradient-to-r from-rose-400 to-pink-500",
};

const typeIcons = {
  Textbook: BookOpen,
  "Lecture Slides": FileText,
  "Video Course": Video,
  "Past Exam": Award,
};

export function ResourceCard({ resource, onClick, showDetails = true }) {
  const Icon = typeIcons[resource.type] || FileText;

  const gradientColor =
    typeColors[resource.type] || "from-gray-400 to-gray-600";

  const badgeGradient =
    typeBadgeColors[resource.type] ||
    "bg-gradient-to-r from-gray-400 to-gray-600";

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className="cursor-pointer h-auto w-[85%] flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-border/50"
        onClick={() => onClick?.(resource.id)}
      >
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {resource.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center rounded-t-2xl"
              style={{ backgroundImage: `url(${resource.imageUrl})` }}
            />
          ) : (
            <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
              <img
                src={pdfThumbnail}
                alt="PDF Resource"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="absolute top-3 right-3">
            <Badge
              className={`${badgeGradient} text-white border-0 shadow-lg px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}
            >
              {resource.type}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-grow p-5 space-y-3">
          <h3 className="font-bold text-lg leading-snug line-clamp-2">
            {resource.title}
          </h3>

          <p className="text-sm text-muted-foreground">{resource.university}</p>

          {resource.tags && showDetails && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2.5 py-0.5 rounded-full bg-muted/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between px-5 py-4 border-t border-border/50 bg-muted/20">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-sm">
              {Number(resource.rating).toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">
              {Number(resource.downloads).toLocaleString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

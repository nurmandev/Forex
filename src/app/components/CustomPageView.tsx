import { useEffect } from "react";
import { CustomPage } from "../data/pages";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { HelpCenter } from "./HelpCenter";

interface CustomPageViewProps {
  page: CustomPage;
  onBack: () => void;
}

export function CustomPageView({ page, onBack }: CustomPageViewProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use custom HelpCenter component for help-center page
  if (page.slug === "help-center") {
    return <HelpCenter onNavigate={(view) => onBack()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 
              prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-li:text-gray-700 prose-li:mb-2
              prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
          
          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Last updated: {new Date(page.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
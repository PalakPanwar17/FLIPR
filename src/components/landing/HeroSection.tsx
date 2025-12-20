import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  // The primary button now links to the contact section
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 xl:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* 1. TITLE CHANGE: Explore Endless Possibilities */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight xl:text-6xl">
            Explore Endless Possibilities
          </h1>
          {/* 2. DESCRIPTION CHANGE: Updated paragraph text */}
          <p className="mb-8 text-lg text-muted-foreground xl:text-xl">
            Discover innovative design solutions and expert guidance to bring your
            dreams to life. We are committed to your project's success, from the
            first sketch to the final result.
          </p>
          <div className="flex flex-col gap-4 xl:flex-row xl:justify-center">
            {/* 3. PRIMARY BUTTON CHANGE: Text, action, and new blue color */}
            <Button size="lg" onClick={scrollToContact} className="bg-[#3b5998] hover:bg-[#2d4373]">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* The secondary 'Get In Touch' button is removed */}
          </div>
        </div>
      </div>
    </section>
  );
}

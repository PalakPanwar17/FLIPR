import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 xl:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight xl:text-6xl">
            Transform Your Vision Into{" "}
            <span className="text-primary">Reality</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground xl:text-xl">
            We deliver exceptional project management solutions that drive
            success. From concept to completion, we're your trusted partner in
            achieving excellence.
          </p>
          <div className="flex flex-col gap-4 xl:flex-row xl:justify-center">
            <Button size="lg" onClick={scrollToProjects}>
              View Our Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContact}>
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

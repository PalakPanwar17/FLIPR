import { HeroSection } from "@/components/landing/HeroSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/common/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <div id="clients">
        <ClientsSection />
      </div>
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

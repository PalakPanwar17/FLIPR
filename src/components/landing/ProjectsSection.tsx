import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
// Removed imports: useEffect, useState, Skeleton, getProjects, Project, useToast

// Define the static list of services/cards to display, matching the 6-card design in Picture 2
const services = [
  { name: "Construction", image_url: "/images/service-1.jpg" }, 
  { name: "Design", image_url: "/images/service-2.jpg" },
  { name: "Project Management", image_url: "/images/service-3.jpg" },
  { name: "Planning & Analysis", image_url: "/images/service-4.jpg" },
  { name: "Client Success", image_url: "/images/service-5.jpg" },
  { name: "Real Estate", image_url: "/images/service-6.jpg" },
];

export function ProjectsSection() {
  
  // All data fetching logic is removed to ensure the 6 cards render statically for the landing page visual.

  return (
    // Removed bg-muted/50 to make the section blend with the hero section's white background for the cards
    <section id="projects" className="py-16 xl:py-24"> 
      <div className="container mx-auto px-4">
        
        {/* THIS IS THE CRITICAL WRAPPER for the 6 cards. 
            We use negative margin (-mt-16) to pull it up over the Hero section 
            and max-w-7xl to keep it aligned with the design in Picture 2. */}
        <div className="flex justify-center -mt-16 xl:-mt-20 z-10 relative">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-w-7xl w-full">
            {services.map((service, index) => (
              <Card
                key={index}
                // Styling to lift card, white background, shadow
                className="overflow-visible shadow-xl border-none pt-4 bg-white text-center flex flex-col items-center" 
              >
                <CardHeader className="p-0 flex justify-center items-center">
                  {/* Circular Image */}
                  <img
                    src={service.image_url} 
                    alt={service.name}
                    className="h-28 w-28 object-cover rounded-full shadow-lg border-4 border-gray-100" 
                  />
                </CardHeader>
                <CardContent className="p-4 text-center flex flex-col items-center">
                  
                  {/* PROJECT NAME / LABEL (Blue Text) */}
                  <CardTitle className="mb-3 text-base font-semibold text-[#3b5998]">
                    {service.name}
                  </CardTitle>
                  
                  {/* READ MORE BUTTON (Blue Link) */}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 text-sm font-medium text-[#3b5998] hover:text-[#2d4373]"
                    onClick={() => {
                        // Implement navigation logic here, e.g., router.push(`/services/${service.name}`)
                        console.log(`Navigating to service: ${service.name}`);
                    }}
                  >
                    Read More
                  </Button>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* We keep the empty div here to create space below the cards */}
        <div className="py-16 xl:py-24"></div> 
      </div>
    </section>
  );
}
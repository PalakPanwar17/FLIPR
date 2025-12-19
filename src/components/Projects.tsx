import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  "Consultation",
  "Design",
  "Marketing & Design",
  "Consulting & Marketing",
  "Consultation",
];

export default function Projects() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-center">
                {project}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4">
              <Button variant="outline">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

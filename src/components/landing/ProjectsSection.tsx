import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/db/api";
import type { Project } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: "Error loading projects",
        description:
          error instanceof Error ? error.message : "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="bg-muted/50 py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
              Our Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successful projects
            </p>
          </div>
          <div className="grid gap-8 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full bg-muted" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-6 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="bg-muted/50 py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
              Our Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successful projects
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">
              No projects available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-muted/50 py-16 xl:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold xl:text-4xl">Our Projects</h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful projects
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="h-48 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{project.name}</CardTitle>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

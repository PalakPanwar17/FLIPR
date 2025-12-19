import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getClients } from "@/db/api";
import type { Client } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { Quote } from "lucide-react";

export function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      toast({
        title: "Error loading testimonials",
        description:
          error instanceof Error ? error.message : "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
              Happy Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              What our clients say about us
            </p>
          </div>
          <div className="grid gap-8 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-16 w-16 rounded-full bg-muted" />
                  <Skeleton className="mb-2 h-6 w-3/4 bg-muted" />
                  <Skeleton className="mb-4 h-4 w-1/2 bg-muted" />
                  <Skeleton className="h-20 w-full bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return (
      <section className="py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
              Happy Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              What our clients say about us
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold xl:text-4xl">Happy Clients</h2>
          <p className="text-lg text-muted-foreground">
            What our clients say about us
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-3">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary" />
                <p className="mb-6 text-muted-foreground">
                  {client.description}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={client.image_url}
                    alt={client.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.designation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

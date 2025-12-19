import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getProjects,
  getClients,
  getContactSubmissions,
  getNewsletterSubscribers,
} from "@/db/api";
import { FolderKanban, Users, Mail, Newspaper } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, clients, contacts, subscribers] = await Promise.all([
        getProjects(),
        getClients(),
        getContactSubmissions(),
        getNewsletterSubscribers(),
      ]);

      setStats({
        projects: projects.length,
        clients: clients.length,
        contacts: contacts.length,
        subscribers: subscribers.length,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      title: "Happy Clients",
      value: stats.clients,
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Contact Submissions",
      value: stats.contacts,
      icon: Mail,
      color: "text-chart-3",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.subscribers,
      icon: Newspaper,
      color: "text-chart-4",
    },
  ];

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-muted" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-20 bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

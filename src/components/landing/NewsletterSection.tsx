import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewsletterSubscriber } from "@/db/api";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      setSubmitting(true);
      await createNewsletterSubscriber({ email: data.email });
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("duplicate key value")
      ) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription failed",
          description:
            error instanceof Error ? error.message : "Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-primary py-16 text-primary-foreground xl:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-6 h-12 w-12" />
          <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
            Stay Updated
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Subscribe to our newsletter and get the latest updates on our
            projects and services
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 xl:flex-row"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-primary-foreground text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary-foreground" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={submitting}
                className="xl:w-auto"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

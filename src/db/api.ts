import { supabase } from "./supabase";
import type {
  Project,
  Client,
  ContactSubmission,
  NewsletterSubscriber,
  ProjectInput,
  ClientInput,
  ContactInput,
  NewsletterInput,
} from "@/types/types";

// Projects API
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createProject(project: ProjectInput): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  project: Partial<ProjectInput>
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
}

// Clients API
export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createClient(client: ClientInput): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .insert([client])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateClient(
  id: string,
  client: Partial<ClientInput>
): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) throw error;
}

// Contact Submissions API
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function createContactSubmission(
  contact: ContactInput
): Promise<ContactSubmission> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([contact])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markContactAsRead(id: string): Promise<void> {
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: true })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Newsletter Subscribers API
export async function getNewsletterSubscribers(): Promise<
  NewsletterSubscriber[]
> {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function createNewsletterSubscriber(
  subscriber: NewsletterInput
): Promise<NewsletterSubscriber> {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([subscriber])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNewsletterSubscriber(id: string): Promise<void> {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Image Upload API
export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from("app-8c7dnh39ps75_project_images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("app-8c7dnh39ps75_project_images")
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const fileName = imageUrl.split("/").pop();
  if (!fileName) return;

  const { error } = await supabase.storage
    .from("app-8c7dnh39ps75_project_images")
    .remove([fileName]);

  if (error) throw error;
}

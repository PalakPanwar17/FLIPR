export interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  submitted_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface ProjectInput {
  name: string;
  description: string;
  image_url: string;
}

export interface ClientInput {
  name: string;
  designation: string;
  description: string;
  image_url: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NewsletterInput {
  email: string;
}

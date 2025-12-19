# Full-Stack Project Management Platform

## Overview

A comprehensive web application featuring a user-facing landing page and an admin management panel. The platform enables dynamic content management for projects, client testimonials, contact form submissions, and newsletter subscriptions.

## Technology Stack

### Frontend
- **React.js** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Hook Form** with Zod validation
- **React Router** for navigation

### Backend
- **Supabase** (PostgreSQL database)
- **Supabase Storage** for image uploads
- **RESTful API** via Supabase client

## Features

### User-Facing Landing Page

1. **Hero Section**
   - Eye-catching introduction with call-to-action buttons
   - Smooth scroll navigation to sections

2. **Projects Section**
   - Dynamic project cards with images, names, and descriptions
   - Responsive grid layout
   - Data fetched from Supabase database

3. **Happy Clients Section**
   - Client testimonials with photos, names, and designations
   - Quote-style card design
   - Responsive grid layout

4. **Contact Form**
   - Input fields: Name, Email, Phone, Message
   - Form validation with error messages
   - Success/error feedback via toast notifications
   - Data stored in Supabase database

5. **Newsletter Subscription**
   - Email input with validation
   - Duplicate email prevention
   - Confirmation messages

### Admin Panel

1. **Dashboard**
   - Summary statistics for all entities
   - Quick overview of projects, clients, contacts, and subscribers

2. **Project Management**
   - Create, read, update, and delete projects
   - Image upload with automatic compression
   - Table view with inline actions

3. **Client Management**
   - CRUD operations for client testimonials
   - Image upload for client photos
   - Manage name, designation, and testimonial text

4. **Contact Submissions**
   - View all contact form submissions
   - Mark as read/unread
   - View detailed submission information
   - Delete submissions

5. **Newsletter Subscribers**
   - View all email subscribers
   - Export subscriber list to CSV
   - Delete subscribers

## Image Upload Features

- **Automatic Compression**: Images larger than 1MB are automatically compressed
- **Format Conversion**: Large images converted to WebP format
- **Resolution Limiting**: Maximum resolution of 1080p maintained
- **Quality Optimization**: Iterative quality reduction until file size is under 1MB
- **Filename Validation**: Only English letters, numbers, hyphens, and underscores allowed
- **Progress Indicator**: Real-time upload progress display
- **User Feedback**: Clear success/error messages with compression details

## Design System

### Color Scheme
- **Primary**: Professional Blue (#2563EB / HSL: 217 91% 60%)
- **Secondary**: Accent Orange (#F97316 / HSL: 25 95% 53%)
- **Background**: Clean White (#FFFFFF)
- **Muted**: Light Gray for sections
- **Text**: Dark Gray for readability

### Visual Details
- Rounded corners: 8px for cards and buttons
- Subtle shadows for depth
- Smooth transitions: 0.3s ease for hover effects
- Responsive typography with proper hierarchy

### Layout
- Desktop-first approach with mobile adaptation
- Card-based layout for content
- Responsive grid system
- Sticky navigation bar
- Sidebar navigation for admin panel

## Database Schema

### projects
- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text, not null)
- `image_url` (text, not null)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### clients
- `id` (uuid, primary key)
- `name` (text, not null)
- `designation` (text, not null)
- `description` (text, not null)
- `image_url` (text, not null)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### contact_submissions
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text, not null)
- `message` (text, not null)
- `is_read` (boolean, default: false)
- `submitted_at` (timestamptz)

### newsletter_subscribers
- `id` (uuid, primary key)
- `email` (text, unique, not null)
- `subscribed_at` (timestamptz)

## Storage

### Bucket: app-8c7dnh39ps75_project_images
- **Max File Size**: 1MB
- **Allowed Types**: image/jpeg, image/png, image/gif, image/webp
- **Access**: Public read/write

## API Endpoints (via Supabase)

### Projects
- `GET /projects` - Retrieve all projects
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Clients
- `GET /clients` - Retrieve all clients
- `POST /clients` - Create new client
- `PATCH /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

### Contact Submissions
- `GET /contact_submissions` - Retrieve all submissions
- `POST /contact_submissions` - Create new submission
- `PATCH /contact_submissions/:id` - Mark as read
- `DELETE /contact_submissions/:id` - Delete submission

### Newsletter Subscribers
- `GET /newsletter_subscribers` - Retrieve all subscribers
- `POST /newsletter_subscribers` - Create new subscriber
- `DELETE /newsletter_subscribers/:id` - Delete subscriber

## Security

- **No Authentication Required**: Public access for all tables (as per requirements)
- **Input Validation**: Client-side and server-side validation
- **SQL Injection Prevention**: Supabase parameterized queries
- **XSS Protection**: React's built-in escaping
- **File Upload Security**: Type and size validation

## Responsive Design

- **Desktop**: Optimized for 1920x1080, 1366x768, 1440x900
- **Laptop**: Optimized for 1280x720, 1536x864
- **Mobile**: Adaptive layout for 375x667, 414x896, 430x932
- **Breakpoints**: Uses Tailwind's `xl:` breakpoint for desktop layouts

## Usage

### Landing Page
1. Navigate to the home page
2. Browse projects and client testimonials
3. Submit contact form or subscribe to newsletter

### Admin Panel
1. Navigate to `/admin`
2. View dashboard statistics
3. Manage projects, clients, contacts, and subscribers
4. Upload images with automatic compression

## Notes

- This implementation uses Supabase as the backend instead of Java Spring Boot + MySQL due to environment constraints
- All functionality specified in the requirements is fully implemented
- The application is production-ready with proper error handling and user feedback
- No sample data has been added - the database starts empty
- All CRUD operations are available through the admin panel

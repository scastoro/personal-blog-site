import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic content information
    title: z.string(),
    description: z.string().max(160, 'Description should be under 160 characters for SEO'),
    
    // Dates for SEO and display
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    
    // Author information
    author: z.string().default('Sal Castoro'),
    
    // SEO and categorization
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    keywords: z.array(z.string()).default([]), // Additional keywords for SEO
    
    // Content status
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    
    // Images for SEO and social sharing
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    ogImage: z.string().optional(), // Specific Open Graph image
    ogImageAlt: z.string().optional(),
    
    // SEO specific fields
    metaTitle: z.string().optional(), // Custom meta title (if different from title)
    canonicalURL: z.string().url().optional(), // Custom canonical URL
    noindex: z.boolean().default(false), // Prevent indexing
    nofollow: z.boolean().default(false), // Prevent following links
    
    // Content classification
    readingTime: z.number().optional(), // Manual override for reading time
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    
    // Social and sharing
    twitterCard: z.enum(['summary', 'summary_large_image']).default('summary_large_image'),
    
    // Related content
    relatedPosts: z.array(z.string()).default([]), // Slugs of related posts
    series: z.string().optional(), // Part of a series
    seriesOrder: z.number().optional(), // Order in series
    
    // Content metrics (for analytics)
    estimatedReadingTime: z.number().optional(),
    wordCount: z.number().optional(),
  }),
});

const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Basic author information
    name: z.string(),
    bio: z.string().max(160, 'Bio should be under 160 characters for SEO'),
    longBio: z.string().optional(), // Longer biography for author pages
    
    // Visual identity
    avatar: z.string().optional(),
    
    // Contact and social media
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    social: z.object({
      twitter: z.string().optional(), // Handle without @
      github: z.string().optional(),
      linkedin: z.string().optional(), // LinkedIn profile slug
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      mastodon: z.string().optional(),
    }).optional(),
    
    // Professional information
    title: z.string().optional(), // Job title
    company: z.string().optional(),
    location: z.string().optional(),
    
    // SEO and structured data
    expertise: z.array(z.string()).default([]), // Areas of expertise
    languages: z.array(z.string()).default(['en']), // Languages spoken
    
    // Author page settings
    showInAuthorsList: z.boolean().default(true),
    featured: z.boolean().default(false),
    
    // Metadata
    joinDate: z.string().or(z.date()).optional(),
    lastActive: z.date().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  authors: authorsCollection,
};
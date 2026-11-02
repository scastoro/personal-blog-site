import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    // Basic content information
    title: z.string(),
    description: z.string().max(160, 'Description should be under 160 characters for SEO'),
    
    // Dates for SEO and display
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
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
    canonicalURL: z.url().optional(), // Custom canonical URL
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

export const collections = {
  blog: blogCollection,
};

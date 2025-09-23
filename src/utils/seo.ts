// SEO Constants and Utilities
export const SITE_CONFIG = {
  name: 'Sal Castoro - Developer Digital Space',
  description: 'High-performance web development insights, modern JavaScript frameworks, and best practices for building exceptional user experiences. Explore tutorials, performance optimization tips, and development workflows from Sal Castoro.',
  url: 'https://salcastoro.com', // Update with your actual domain
  defaultImage: '/og-image.jpg',
  author: {
    name: 'Sal Castoro',
    twitter: '@s_castoro',
    github: 'scastoro',
    linkedin: 'sal-castoro-3b1050178',
    email: 'hello@salcastoro.com', // Update with your email
  },
  social: {
    twitter: 'https://x.com/s_castoro',
    github: 'https://github.com/scastoro',
    linkedin: 'https://www.linkedin.com/in/sal-castoro-3b1050178',
  },
  language: 'en',
  locale: 'en_US',
  timezone: 'America/New_York', // Update with your timezone
} as const;

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  canonicalURL?: string | URL;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate a full page title with site name
 */
export function generatePageTitle(title?: string): string {
  if (!title || title === SITE_CONFIG.name) {
    return SITE_CONFIG.name;
  }
  return `${title} | ${SITE_CONFIG.name}`;
}

/**
 * Generate canonical URL from string or URL object
 */
export function generateCanonicalURL(url: string | URL, baseURL: string): string {
  if (url instanceof URL) {
    return url.toString();
  }
  return new URL(url, baseURL).toString();
}

/**
 * Generate Open Graph image URL
 */
export function generateImageURL(image: string, baseURL: string): string {
  if (image.startsWith('http')) {
    return image;
  }
  return new URL(image, baseURL).toString();
}

/**
 * Generate robots meta content
 */
export function generateRobotsContent(noindex = false, nofollow = false): string {
  const directives: string[] = [];
  
  if (noindex) {
    directives.push('noindex');
  } else {
    directives.push('index');
  }
  
  if (nofollow) {
    directives.push('nofollow');
  } else {
    directives.push('follow');
  }
  
  return directives.join(', ');
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url: url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    publisher: {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: SITE_CONFIG.author.name,
      url: url,
      sameAs: [
        SITE_CONFIG.social.twitter,
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.linkedin,
      ].filter(Boolean),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD structured data for person
 */
export function generatePersonSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: SITE_CONFIG.author.name,
    url: url,
    email: SITE_CONFIG.author.email,
    jobTitle: 'Web Developer', // Update with your job title
    worksFor: {
      '@type': 'Organization',
      name: 'Independent', // Update with your organization
    },
    sameAs: [
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
    ].filter(Boolean),
  };
}

/**
 * Generate JSON-LD structured data for blog posting
 */
export function generateBlogPostSchema(
  url: string,
  title: string,
  description: string,
  publishedTime: string,
  modifiedTime?: string,
  image?: string,
  author?: string,
  tags?: string[]
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    url: url,
    headline: title,
    description: description,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}#person`,
      name: author || SITE_CONFIG.author.name,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}#person`,
      name: SITE_CONFIG.author.name,
      logo: {
        '@type': 'ImageObject',
        url: generateImageURL('/logo.png', SITE_CONFIG.url),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: SITE_CONFIG.language,
  };

  // Add image if provided
  if (image) {
    Object.assign(schema, {
      image: {
        '@type': 'ImageObject',
        url: generateImageURL(image, SITE_CONFIG.url),
      },
    });
  }

  // Add keywords if tags are provided
  if (tags && tags.length > 0) {
    Object.assign(schema, {
      keywords: tags.join(', '),
    });
  }

  return schema;
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
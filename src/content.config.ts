import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const rtos = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/rtos"}),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    codeUrl: z.string().url().optional(),
    siteUrl: z.string().url().optional(),
    image: z.string().optional(),
    lastUpdated: z.coerce.date(),
    star: z.number().default(0),
    version: z.string().optional(),
    components: z.array(z.string()).default([]),
    licenses: z.array(z.string()).default([]),
    platforms: z.array(z.string()).default([]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

const libraries = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/libraries"}),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    libraryType: z.enum([
      'GUI',          // Graphical User Interface
      'FileSystem',   // File Systems
      'Database',     // Embedded Databases
      'Network',      // Network Stacks (TCP/IP)
      'Wireless',     // Wireless Communication (Bluetooth, WiFi, LoRa, etc.)
      'MachineLearning',  // Machine Learning & AI
      'Audio',        // Audio Processing & Codecs
      'Video',        // Video Processing & Codecs
      'Graphics',     // 2D/3D Graphics Libraries
      'Language',     // Programming Languages & Interpreters
      'HAL',          // Hardware Abstraction Layer
      'Middleware',   // Middleware & Frameworks
      'Bootloader',   // Bootloaders & Boot Management
      'Cryptography', // Cryptography & Security
      'Testing',      // Testing & Debugging Tools
      'Tracing',      // Tracing & Profiling
    ]),
    codeUrl: z.string().url().optional(),
    siteUrl: z.string().url().optional(),
    image: z.string().optional(),
    lastUpdated: z.coerce.date(),
    star: z.number().default(0),
    version: z.string().optional(),
    licenses: z.array(z.string()).default([]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

const projects = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/projects"}),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    codeUrl: z.string().url().optional(),
    siteUrl: z.string().url().optional(),
    image: z.string().optional(),
    isShow: z.boolean().default(false),
    rtos: z.string(), // Reference to RTOS slug
    libraries: z.array(z.string()).default([]), // References to library slugs
    topics: z.array(z.string()).default([]), // GitHub topics (metadata only)
    lastUpdated: z.coerce.date(),
    star: z.number().default(0),
    version: z.string().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = {rtos, libraries, projects};

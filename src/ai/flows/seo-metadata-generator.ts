'use server';

/**
 * @fileOverview Automatically generates SEO-friendly meta titles, tags, and descriptions for each movie.
 *
 * - generateSeoMetadata - A function that handles the generation of SEO metadata for a movie.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  description: z.string().describe('The description of the movie.'),
  genre: z.string().describe('The genre of the movie.'),
  year: z.string().describe('The release year of the movie.'),
  language: z.string().describe('The language of the movie.'),
  quality: z.string().describe('The quality of the movie (e.g., 720p, 1080p).'),
  format: z.string().describe('The format of the movie (e.g., x265).'),
  tags: z.array(z.string()).describe('Array of tags associated with the movie (e.g., Action, Drama, Hindi Dubbed).'),
});

export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  metaTitle: z.string().describe('The SEO-friendly meta title for the movie.'),
  metaDescription: z.string().describe('The SEO-friendly meta description for the movie.'),
  metaTags: z.string().describe('The SEO-friendly meta tags for the movie (comma-separated).'),
});

export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(input: GenerateSeoMetadataInput): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `You are an SEO expert specializing in generating meta titles, descriptions, and tags for movie websites.

  Given the following movie metadata, generate an SEO-friendly meta title, description, and tags.

  Title: {{{title}}}
  Description: {{{description}}}
  Genre: {{{genre}}}
  Year: {{{year}}}
  Language: {{{language}}}
  Quality: {{{quality}}}
  Format: {{{format}}}
  Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Ensure the meta title is concise and includes relevant keywords.
  The meta description should be engaging and accurately summarize the movie's content.
  The meta tags should be comma-separated and include a variety of relevant keywords.
  `,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

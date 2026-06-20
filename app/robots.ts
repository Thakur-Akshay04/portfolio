import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "PerplexityBot",
          "anthropic-ai",
          "cohere-ai",
          "CCBot",
          "Diffbot",
          "Bytespider",
          "ImagesiftBot",
          "facebookexternalhit",
          "Meta-ExternalAgent",
          "Omgilibot",
          "Omgili"
        ],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}

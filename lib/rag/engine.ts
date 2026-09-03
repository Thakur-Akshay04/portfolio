import { KNOWLEDGE_BASE, KnowledgeChunk } from "./knowledgeBase";

export interface SearchResultItem {
  chunk: KnowledgeChunk;
  score: number;
  snippet: string;
  matchedTerms: string[];
}

export interface RagResponse {
  query: string;
  answer: string;
  results: SearchResultItem[];
  primaryAction?: {
    windowId: KnowledgeChunk["windowId"];
    targetId?: string;
    actionLabel: string;
    title: string;
  };
}

// Tokenize and clean text
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Score a chunk against search tokens
function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[], rawQuery: string): { score: number; matchedTerms: string[]; snippet: string } {
  let score = 0;
  const matchedTerms: string[] = [];
  const lowerQuery = rawQuery.toLowerCase().trim();
  const lowerContent = chunk.content.toLowerCase();
  const lowerTitle = chunk.title.toLowerCase();

  // Exact phrase match bonus
  if (lowerTitle.includes(lowerQuery)) {
    score += 50;
    matchedTerms.push(rawQuery);
  }
  if (lowerContent.includes(lowerQuery)) {
    score += 35;
    matchedTerms.push(rawQuery);
  }

  // Token matches
  for (const token of queryTokens) {
    let tokenMatched = false;

    // Title match
    if (lowerTitle.includes(token)) {
      score += 15;
      tokenMatched = true;
    }

    // Keyword exact matches
    for (const kw of chunk.keywords) {
      if (kw === token) {
        score += 12;
        tokenMatched = true;
      } else if (kw.includes(token)) {
        score += 6;
        tokenMatched = true;
      }
    }

    // Content occurrence
    const regex = new RegExp(`\\b${token}\\b`, "gi");
    const matches = lowerContent.match(regex);
    if (matches) {
      score += Math.min(matches.length * 4, 20);
      tokenMatched = true;
    }

    if (tokenMatched && !matchedTerms.includes(token)) {
      matchedTerms.push(token);
    }
  }

  // Generate relevant contextual snippet
  let snippet = chunk.content.slice(0, 160) + "...";
  if (matchedTerms.length > 0) {
    const firstTerm = matchedTerms[0];
    const idx = lowerContent.indexOf(firstTerm.toLowerCase());
    if (idx !== -1) {
      const start = Math.max(0, idx - 40);
      const end = Math.min(chunk.content.length, idx + 120);
      snippet = (start > 0 ? "..." : "") + chunk.content.slice(start, end) + (end < chunk.content.length ? "..." : "");
    }
  }

  return { score, matchedTerms, snippet };
}

export function queryRag(query: string): RagResponse {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: "",
      answer: "",
      results: [],
    };
  }

  const queryTokens = tokenize(trimmed);
  const scored = KNOWLEDGE_BASE.map((chunk) => {
    const { score, matchedTerms, snippet } = scoreChunk(chunk, queryTokens, trimmed);
    return {
      chunk,
      score,
      snippet,
      matchedTerms,
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topResults = scored.slice(0, 6);

  const primaryAction =
    topResults.length > 0
      ? {
          windowId: topResults[0].chunk.windowId,
          targetId: topResults[0].chunk.targetId,
          actionLabel: topResults[0].chunk.actionLabel,
          title: topResults[0].chunk.title,
        }
      : undefined;

  return {
    query: trimmed,
    answer: topResults.length > 0 ? `Found ${topResults.length} matching entries for "${trimmed}".` : "",
    results: topResults,
    primaryAction,
  };
}

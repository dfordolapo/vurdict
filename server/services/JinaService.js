import axios from 'axios';

/**
 * JinaService
 * Extracts readable content from a URL using the Jina Reader API (r.jina.ai).
 * No API key required for basic usage; add your key for higher rate limits.
 */

const JINA_BASE_URL = 'https://r.jina.ai/';
const JINA_TIMEOUT_MS = 20000; // 20 seconds

/**
 * Fetches and extracts text content from a given URL via Jina Reader.
 * @param {string} url - The portfolio URL to extract content from.
 * @returns {Promise<string>} - Extracted Markdown-formatted content.
 */
export async function extractContent(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('A valid URL is required.');
  }

  const jinaUrl = `${JINA_BASE_URL}${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(jinaUrl, {
      timeout: JINA_TIMEOUT_MS,
      headers: {
        Accept: 'text/plain',
        // Uncomment and set if you have a Jina API key:
        // Authorization: `Bearer ${process.env.JINA_API_KEY}`,
      },
    });

    const content = response.data;

    if (!content || content.trim().length < 50) {
      throw new Error(
        'The provided URL returned insufficient content. Is the portfolio publicly accessible?'
      );
    }

    return content;
  } catch (err) {
    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      throw new Error('The portfolio URL timed out. Please check it is accessible and try again.');
    }

    if (err.response?.status === 404) {
      throw new Error('The portfolio URL returned a 404 — page not found.');
    }

    if (err.response?.status === 403) {
      throw new Error('Access to the portfolio URL was forbidden (403). It may require a login.');
    }

    // Re-throw enriched errors
    throw new Error(err.message || 'Failed to extract content from the provided URL.');
  }
}

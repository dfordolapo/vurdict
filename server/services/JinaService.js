import axios from 'axios';

/**
 * JinaService
 * Extracts readable content from a URL using the Jina Reader API (r.jina.ai).
 * No API key required for basic usage; add your key for higher rate limits.
 */

const JINA_BASE_URL = 'https://r.jina.ai/';
const JINA_TIMEOUT_MS = 30000; // 30 seconds
const MAX_RETRIES = 2;

/**
 * Fetches and extracts text content from a given URL via Jina Reader.
 * Includes retry logic and no-cache to ensure fresh, thorough extraction.
 * @param {string} url - The portfolio URL to extract content from.
 * @param {number} retries - Internal retry counter.
 * @returns {Promise<string>} - Extracted Markdown-formatted content.
 */
export async function extractContent(url, retries = MAX_RETRIES) {
  if (!url || typeof url !== 'string') {
    throw new Error('A valid URL is required.');
  }

  const jinaUrl = `${JINA_BASE_URL}${encodeURIComponent(url)}?no-cache=true&retry=true`;

  try {
    const response = await axios.get(jinaUrl, {
      timeout: JINA_TIMEOUT_MS,
      maxContentLength: 5 * 1024 * 1024, // limit payload size to 5MB to prevent OOM DoS
      headers: {
        Accept: 'text/plain',
      },
    });

    const content = response.data;

    if (!content || content.trim().length < 50) {
      if (retries > 0) {
        console.warn(`[JinaService] Insufficient content, retrying... (${retries} left)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return extractContent(url, retries - 1);
      }
      throw new Error(
        'The provided URL returned insufficient content. Is the portfolio publicly accessible?'
      );
    }

    return content;
  } catch (err) {
    if (retries > 0 && !err.message.includes('404') && !err.message.includes('403')) {
      console.warn(`[JinaService] Request failed, retrying... (${retries} left): ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return extractContent(url, retries - 1);
    }

    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      throw new Error('JinaTimeout: The portfolio URL timed out. Please check it is accessible and try again.');
    }

    if (err.response?.status === 404) {
      throw new Error('JinaNotFound: The portfolio URL returned a 404 — page not found.');
    }

    if (err.response?.status === 403) {
      throw new Error('JinaForbidden: Access to the portfolio URL was forbidden (403). It may require a login.');
    }

    // Re-throw enriched errors
    throw new Error('JinaError: ' + (err.message || 'Failed to extract content from the provided URL.'));
  }
}

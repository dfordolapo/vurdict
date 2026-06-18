import { kv } from '@vercel/kv';
import crypto from 'crypto';

// In-memory fallback for local development if KV is not configured
const memoryCache = new Map();

export const generateJobId = (url, goal) => {
  return crypto.createHash('sha256').update(`${url}-${goal}`).digest('hex');
};

const isKVConfigured = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

export const getJobStatus = async (jobId) => {
  try {
    if (isKVConfigured()) {
      return await kv.get(`vurdict:job:${jobId}`);
    } else {
      return memoryCache.get(jobId) || null;
    }
  } catch (err) {
    console.error('[KVService] Error getting job status:', err);
    return null;
  }
};

export const setJobProcessing = async (jobId) => {
  try {
    const data = { status: 'processing', timestamp: Date.now() };
    if (isKVConfigured()) {
      // Set to expire after 10 minutes if it gets stuck
      await kv.set(`vurdict:job:${jobId}`, data, { ex: 600 });
    } else {
      memoryCache.set(jobId, data);
    }
  } catch (err) {
    console.error('[KVService] Error setting job processing:', err);
  }
};

export const setJobCompleted = async (jobId, evaluation) => {
  try {
    const data = { status: 'completed', evaluation, timestamp: Date.now() };
    if (isKVConfigured()) {
      // Cache completed reports for 24 hours
      await kv.set(`vurdict:job:${jobId}`, data, { ex: 86400 });
    } else {
      memoryCache.set(jobId, data);
    }
  } catch (err) {
    console.error('[KVService] Error setting job completed:', err);
  }
};

export const setJobFailed = async (jobId, errorConfig) => {
  try {
    const data = { status: 'failed', errorConfig, timestamp: Date.now() };
    if (isKVConfigured()) {
      // Cache failed states briefly (e.g., 5 minutes)
      await kv.set(`vurdict:job:${jobId}`, data, { ex: 300 });
    } else {
      memoryCache.set(jobId, data);
    }
  } catch (err) {
    console.error('[KVService] Error setting job failed:', err);
  }
};

export const waitForJobCompletion = async (jobId, timeoutMs = 25000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    const job = await getJobStatus(jobId);
    if (!job) return null; // Job disappeared
    
    if (job.status === 'completed' || job.status === 'failed') {
      return job;
    }
    
    // Wait 3 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  return null; // Timed out waiting
};

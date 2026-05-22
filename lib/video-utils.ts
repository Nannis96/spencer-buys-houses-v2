/**
 * Utilities for parsing and embedding YouTube / Dailymotion video URLs.
 * Only embed URLs are generated dynamically — raw URLs are stored in DB.
 */

export type VideoProvider = 'youtube' | 'dailymotion';

export interface ParsedVideo {
    provider: VideoProvider;
    id: string;
    embedUrl: string;
}

/**
 * Extracts the YouTube video ID from the most common URL formats:
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://www.youtube.com/embed/ID
 *   https://www.youtube.com/shorts/ID
 *   https://m.youtube.com/watch?v=ID
 */
function extractYouTubeId(url: string): string | null {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');

        if (host === 'youtu.be') {
            // https://youtu.be/VIDEO_ID
            const id = parsed.pathname.slice(1).split('/')[0];
            return id || null;
        }

        if (host === 'youtube.com') {
            // /watch?v=ID
            const v = parsed.searchParams.get('v');
            if (v) return v;

            // /embed/ID  or  /shorts/ID
            const parts = parsed.pathname.split('/').filter(Boolean);
            if ((parts[0] === 'embed' || parts[0] === 'shorts') && parts[1]) {
                return parts[1];
            }
        }
    } catch {
        // invalid URL — return null
    }
    return null;
}

/**
 * Extracts the Dailymotion video ID from:
 *   https://www.dailymotion.com/video/ID
 *   https://dai.ly/ID
 */
function extractDailymotionId(url: string): string | null {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, '');

        if (host === 'dai.ly') {
            return parsed.pathname.slice(1).split('/')[0] || null;
        }

        if (host === 'dailymotion.com') {
            const parts = parsed.pathname.split('/').filter(Boolean);
            if (parts[0] === 'video' && parts[1]) {
                // IDs can contain underscores followed by a slug — keep only the bare ID
                return parts[1].split('_')[0];
            }
        }
    } catch {
        // invalid URL — return null
    }
    return null;
}

/**
 * Parses a video URL and returns provider, clean ID, and ready-to-use embed URL.
 * Returns null when the URL is not a recognised YouTube / Dailymotion link.
 */
export function parseVideoUrl(url: string): ParsedVideo | null {
    if (!url || typeof url !== 'string') return null;

    const ytId = extractYouTubeId(url);
    if (ytId) {
        return {
            provider: 'youtube',
            id: ytId,
            embedUrl: `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&color=white`,
        };
    }

    const dmId = extractDailymotionId(url);
    if (dmId) {
        return {
            provider: 'dailymotion',
            id: dmId,
            embedUrl: `https://www.dailymotion.com/embed/video/${dmId}`,
        };
    }

    return null;
}

/**
 * Returns true when the URL is a valid YouTube or Dailymotion video link.
 */
export function isValidVideoUrl(url: string): boolean {
    return parseVideoUrl(url) !== null;
}

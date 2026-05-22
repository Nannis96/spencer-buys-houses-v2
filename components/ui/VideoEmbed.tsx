import { parseVideoUrl } from '@/lib/video-utils';

interface VideoEmbedProps {
    videoUrl: string;
    videoTitle: string;
    autoplay?: boolean;
    mute?: boolean;
}

/**
 * Renders a responsive 16:9 iframe for YouTube or Dailymotion videos.
 * The embed URL is generated dynamically — raw URLs are never written to the DOM.
 * XSS is prevented by only allowing embed URLs produced by parseVideoUrl().
 */
export default function VideoEmbed({
    videoUrl,
    videoTitle,
    autoplay = true,
    mute = true,
}: VideoEmbedProps) {
    const parsed = parseVideoUrl(videoUrl);
    if (!parsed) return null;

    let src = parsed.embedUrl;
    if (autoplay) src += `&autoplay=1`;
    if (mute) src += `&mute=1`;

    return (
        <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
            <iframe
                className="absolute inset-0 w-full h-full"
                src={src}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

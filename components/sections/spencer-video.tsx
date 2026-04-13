"use client"

import { useEffect, useRef } from "react"

interface Props {
    videoId?: string
}

export default function SpencerVideo({ videoId = "mYKXVKhun3I" }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const playerRef = useRef<any>(null)

    useEffect(() => {
        let observer: IntersectionObserver | null = null
        let resizeObserver: ResizeObserver | null = null

        const createPlayer = () => {
            if (playerRef.current || !(window as any).YT || !containerRef.current) return
            const container = containerRef.current
            playerRef.current = new (window as any).YT.Player("spencer-video-player", {
                videoId,
                width: container.clientWidth,
                height: Math.round((container.clientWidth * 9) / 16),
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                },
                events: {
                    onReady: (e: any) => {
                        try {
                            e.target.mute()
                        } catch (err) { }
                    },
                },
            })
        }

        const onYouTubeIframeAPIReady = () => createPlayer()

        if (!(window as any).YT) {
            const tag = document.createElement("script")
            tag.src = "https://www.youtube.com/iframe_api"
            document.body.appendChild(tag)
                ; (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
        } else {
            createPlayer()
        }

        const intersectionCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (!playerRef.current) return
                try {
                    if (entry.isIntersecting) {
                        playerRef.current.playVideo()
                    } else {
                        playerRef.current.pauseVideo()
                    }
                } catch (err) { }
            })
        }

        if (containerRef.current) {
            observer = new IntersectionObserver(intersectionCallback, { threshold: 0.5 })
            observer.observe(containerRef.current)

            // keep iframe sized to container
            resizeObserver = new ResizeObserver(() => {
                if (!containerRef.current || !playerRef.current) return
                const w = containerRef.current.clientWidth
                const h = Math.round((w * 9) / 16)
                try {
                    playerRef.current.setSize(w, h)
                } catch (err) { }
            })
            resizeObserver.observe(containerRef.current)
        }

        return () => {
            if (observer && containerRef.current) observer.unobserve(containerRef.current)
            if (resizeObserver && containerRef.current) resizeObserver.unobserve(containerRef.current)
        }
    }, [videoId])

    return (
        <div ref={containerRef} className="mt-6 lg:mt-0 w-full aspect-video rounded-2xl overflow-hidden shadow-md">
            <div id="spencer-video-player" style={{ width: "100%", height: "100%" }} />
        </div>
    )
}

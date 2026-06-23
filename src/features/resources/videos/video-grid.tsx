import { VideoContent } from '@/lib/interfaces/video'
import VideoCard from './video-card'

export default function VideoGrid({ videos }: { videos: VideoContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {videos.map((video) => (
        <VideoCard key={video.slug} video={video} />
      ))}
    </div>
  )
}

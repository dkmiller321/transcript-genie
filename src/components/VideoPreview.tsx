import GlassCard from "@/components/GlassCard";
import { Clock, FileText, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoData {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  wordCount: number;
}

interface VideoPreviewProps {
  video: VideoData | null;
  loading?: boolean;
}

const VideoPreview = ({ video, loading = false }: VideoPreviewProps) => {
  if (loading) {
    return (
      <GlassCard className="p-4 animate-fade-in">
        <div className="flex gap-4">
          <Skeleton className="w-40 h-24 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  if (!video) return null;

  return (
    <GlassCard className="p-4 animate-fade-in-up" hover>
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative w-40 h-24 rounded-xl overflow-hidden flex-shrink-0 group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <User className="w-3.5 h-3.5" />
            <span className="truncate">{video.channel}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{video.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>{video.wordCount.toLocaleString()} words</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default VideoPreview;
export type { VideoData };

import { useState, useMemo } from "react";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Copy, Check, AlignLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptViewerProps {
  segments: TranscriptSegment[];
  videoId?: string;
}

const formatTimestamp = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TranscriptViewer = ({ segments, videoId }: TranscriptViewerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("plain");

  // Plain text version
  const plainText = useMemo(() => {
    return segments.map(s => s.text).join(' ');
  }, [segments]);

  // Filter segments based on search
  const filteredSegments = useMemo(() => {
    if (!searchQuery.trim()) return segments;
    
    const query = searchQuery.toLowerCase();
    return segments.filter(s => 
      s.text.toLowerCase().includes(query)
    );
  }, [segments, searchQuery]);

  // Highlight matching text
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const query = searchQuery.toLowerCase();
    const index = text.toLowerCase().indexOf(query);
    
    if (index === -1) return text;
    
    return (
      <>
        {text.slice(0, index)}
        <mark className="bg-yellow-500/30 text-foreground rounded px-0.5">
          {text.slice(index, index + searchQuery.length)}
        </mark>
        {text.slice(index + searchQuery.length)}
      </>
    );
  };

  const handleCopy = async () => {
    const textToCopy = activeTab === "plain" 
      ? plainText 
      : segments.map(s => `[${formatTimestamp(s.start)}] ${s.text}`).join('\n');
    
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Transcript has been copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTimestampClick = (seconds: number) => {
    if (videoId) {
      window.open(`https://youtube.com/watch?v=${videoId}&t=${Math.floor(seconds)}s`, '_blank');
    }
  };

  return (
    <GlassCard className="p-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="plain" className="gap-2">
              <AlignLeft className="w-4 h-4" />
              Plain Text
            </TabsTrigger>
            <TabsTrigger value="timestamps" className="gap-2">
              <Clock className="w-4 h-4" />
              Timestamped
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary/50 border-white/10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="border-white/10 hover:bg-white/5"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="h-80 overflow-y-auto rounded-xl bg-secondary/30 p-4">
        {activeTab === "plain" ? (
          <p className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {searchQuery ? highlightText(plainText) : plainText}
          </p>
        ) : (
          <div className="space-y-3">
            {filteredSegments.map((segment, index) => (
              <div 
                key={index}
                className="flex gap-3 group"
              >
                <button
                  onClick={() => handleTimestampClick(segment.start)}
                  className={cn(
                    "flex-shrink-0 font-mono text-xs px-2 py-1 rounded-md transition-colors",
                    "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10",
                    videoId && "cursor-pointer"
                  )}
                >
                  {formatTimestamp(segment.start)}
                </button>
                <p className="font-mono text-sm text-foreground/90">
                  {highlightText(segment.text)}
                </p>
              </div>
            ))}
            {filteredSegments.length === 0 && searchQuery && (
              <p className="text-center text-muted-foreground py-8">
                No matches found for "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </div>

      {searchQuery && (
        <p className="text-xs text-muted-foreground mt-3">
          {filteredSegments.length} segment{filteredSegments.length !== 1 ? 's' : ''} found
        </p>
      )}
    </GlassCard>
  );
};

export default TranscriptViewer;
export type { TranscriptSegment };

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import GlassCard from "@/components/GlassCard";
import GradientButton from "@/components/GradientButton";
import URLInput from "@/components/URLInput";
import VideoPreview, { VideoData } from "@/components/VideoPreview";
import TranscriptViewer, { TranscriptSegment } from "@/components/TranscriptViewer";
import ExportButtons from "@/components/ExportButtons";
import ProgressCard from "@/components/ProgressCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Zap, 
  FileText, 
  Youtube, 
  Clock, 
  Download, 
  Sparkles,
  ChevronDown,
  Users
} from "lucide-react";

// Mock data for demo
const MOCK_VIDEO: VideoData = {
  id: "dQw4w9WgXcQ",
  title: "How to Build a Modern Web App in 2024 - Complete Tutorial",
  channel: "Tech Academy",
  thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  duration: "12:34",
  wordCount: 2847,
};

const MOCK_TRANSCRIPT: TranscriptSegment[] = [
  { start: 0, duration: 4.5, text: "Welcome back to the channel! Today we're going to build something incredible together." },
  { start: 4.5, duration: 5.2, text: "We'll be creating a modern web application from scratch using the latest technologies." },
  { start: 9.7, duration: 4.8, text: "Before we dive in, make sure you've got your development environment set up." },
  { start: 14.5, duration: 5.5, text: "We'll be using React for the frontend, which gives us a powerful component-based architecture." },
  { start: 20, duration: 4.2, text: "For styling, we're going with Tailwind CSS - it's incredibly flexible and fast to work with." },
  { start: 24.2, duration: 5.8, text: "The backend will be powered by Supabase, giving us authentication, database, and more out of the box." },
  { start: 30, duration: 4.3, text: "Let's start by setting up our project structure. Open your terminal and follow along." },
  { start: 34.3, duration: 5.1, text: "First, we'll initialize a new Vite project. Vite is blazingly fast and perfect for modern development." },
  { start: 39.4, duration: 4.7, text: "Now let's install our dependencies. We'll need React Router for navigation." },
  { start: 44.1, duration: 5.4, text: "Tanstack Query will handle our server state beautifully with caching and invalidation." },
  { start: 49.5, duration: 4.9, text: "Let's create our first component. This will be the main layout of our application." },
  { start: 54.4, duration: 5.2, text: "Notice how we're using semantic HTML elements. This improves accessibility and SEO." },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Extract transcripts in seconds, not minutes. Optimized for speed and reliability.",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Export to TXT, SRT subtitles, or structured JSON for your workflows.",
  },
  {
    icon: Youtube,
    title: "Channel Batch",
    description: "Extract transcripts from entire channels. Process hundreds of videos at once.",
  },
  {
    icon: Sparkles,
    title: "AI-Ready",
    description: "Perfect for AI training, content analysis, and research projects.",
  },
];

const Index = () => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [video, setVideo] = useState<VideoData | null>(null);
  const [transcript, setTranscript] = useState<TranscriptSegment[] | null>(null);
  
  // Channel extraction state
  const [channelOpen, setChannelOpen] = useState(false);
  const [videoLimit, setVideoLimit] = useState([50]);
  const [combinedOutput, setCombinedOutput] = useState(true);
  const [channelProgress, setChannelProgress] = useState<{
    active: boolean;
    current: number;
    total: number;
    currentItem: string;
    success: number;
    failed: number;
  } | null>(null);

  const handleExtract = async () => {
    if (!isValidUrl) return;
    
    setIsExtracting(true);
    setVideo(null);
    setTranscript(null);
    
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVideo(MOCK_VIDEO);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTranscript(MOCK_TRANSCRIPT);
    setIsExtracting(false);
    
    toast({
      title: "Transcript extracted!",
      description: `Successfully extracted ${MOCK_TRANSCRIPT.length} segments.`,
    });
  };

  const handleExport = (format: 'txt' | 'srt' | 'json') => {
    if (!transcript) return;
    
    let content: string;
    let filename: string;
    let mimeType: string;
    
    if (format === 'txt') {
      content = transcript.map(s => s.text).join(' ');
      filename = 'transcript.txt';
      mimeType = 'text/plain';
    } else if (format === 'srt') {
      content = transcript.map((s, i) => {
        const start = formatSRTTime(s.start);
        const end = formatSRTTime(s.start + s.duration);
        return `${i + 1}\n${start} --> ${end}\n${s.text}\n`;
      }).join('\n');
      filename = 'transcript.srt';
      mimeType = 'text/plain';
    } else {
      content = JSON.stringify({ segments: transcript }, null, 2);
      filename = 'transcript.json';
      mimeType = 'application/json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(downloadUrl);
    
    toast({
      title: `Exported as ${format.toUpperCase()}`,
      description: `Downloaded ${filename}`,
    });
  };

  const formatSRTTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  const startChannelExtraction = () => {
    setChannelProgress({
      active: true,
      current: 0,
      total: videoLimit[0],
      currentItem: "Fetching channel videos...",
      success: 0,
      failed: 0,
    });
    
    // Simulate progress
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= videoLimit[0]) {
        clearInterval(interval);
        setChannelProgress(prev => prev ? {
          ...prev,
          active: false,
          current: videoLimit[0],
          success: videoLimit[0] - 2,
          failed: 2,
        } : null);
        toast({
          title: "Channel extraction complete!",
          description: `Extracted ${videoLimit[0] - 2} transcripts successfully.`,
        });
        return;
      }
      setChannelProgress(prev => prev ? {
        ...prev,
        current,
        currentItem: `Processing video ${current} of ${videoLimit[0]}...`,
        success: Math.floor(current * 0.95),
        failed: Math.floor(current * 0.05),
      } : null);
    }, 200);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Extract YouTube transcripts instantly
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              Turn YouTube Videos into{" "}
              <span className="gradient-text">Readable Text</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Extract, search, and export transcripts from any YouTube video or entire channels. 
              Perfect for researchers, content creators, and AI enthusiasts.
            </p>
            
            {/* URL Input */}
            <div className="max-w-2xl mx-auto space-y-4">
              <URLInput 
                onURLChange={(newUrl, valid) => {
                  setUrl(newUrl);
                  setIsValidUrl(valid);
                }}
                onURLSubmit={handleExtract}
                loading={isExtracting}
              />
              
              <GradientButton
                size="lg"
                onClick={handleExtract}
                loading={isExtracting}
                disabled={!isValidUrl}
                className="w-full sm:w-auto px-12"
              >
                <Zap className="w-5 h-5" />
                Extract Transcript
              </GradientButton>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {(video || isExtracting) && (
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <VideoPreview video={video} loading={isExtracting && !video} />
              
              {transcript && (
                <>
                  <TranscriptViewer segments={transcript} videoId={video?.id} />
                  <ExportButtons onExport={handleExport} tier="free" />
                </>
              )}
            </div>
          </section>
        )}

        {/* Channel Extraction Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Collapsible open={channelOpen} onOpenChange={setChannelOpen}>
              <CollapsibleTrigger asChild>
                <GlassCard className="p-6 cursor-pointer" hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Channel Batch Extraction</h3>
                        <p className="text-sm text-muted-foreground">Extract transcripts from entire channels</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${channelOpen ? 'rotate-180' : ''}`} />
                  </div>
                </GlassCard>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pt-4 space-y-4">
                <GlassCard className="p-6">
                  <div className="space-y-6">
                    <URLInput 
                      placeholder="Paste YouTube channel URL..."
                      onURLChange={() => {}}
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Video Limit: <span className="text-primary">{videoLimit[0]}</span>
                        </Label>
                        <Slider
                          value={videoLimit}
                          onValueChange={setVideoLimit}
                          min={10}
                          max={500}
                          step={10}
                          className="py-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Free: 25 max • Pro: 100 max • Business: 500 max
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Output Format</Label>
                        <div className="flex items-center gap-3">
                          <Switch 
                            checked={combinedOutput}
                            onCheckedChange={setCombinedOutput}
                          />
                          <span className="text-sm text-muted-foreground">
                            {combinedOutput ? "Combined file" : "Individual files"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <GradientButton onClick={startChannelExtraction} className="w-full">
                      <Download className="w-5 h-5" />
                      Start Batch Extraction
                    </GradientButton>
                  </div>
                </GlassCard>
                
                {channelProgress && (
                  <ProgressCard
                    title="Extracting Channel Transcripts"
                    current={channelProgress.current}
                    total={channelProgress.total}
                    currentItem={channelProgress.currentItem}
                    successCount={channelProgress.success}
                    failedCount={channelProgress.failed}
                    status={channelProgress.active ? 'processing' : 'completed'}
                    onCancel={() => setChannelProgress(null)}
                  />
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful Features for{" "}
              <span className="gradient-text">Every Use Case</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're researching, creating content, or training AI models, 
              TranscriptFlow has you covered.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto stagger-children">
            {FEATURES.map((feature, index) => (
              <GlassCard 
                key={index} 
                className="p-6 text-center" 
                hover 
                glow
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center" glow>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Extract{" "}
              <span className="gradient-text">Unlimited Transcripts</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Upgrade to Pro for more exports, batch channel extraction, 
              and premium formats. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton size="lg">
                Get Pro - $9.99/mo
              </GradientButton>
              <GradientButton size="lg" variant="outline">
                View Pricing
              </GradientButton>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold gradient-text">TranscriptFlow</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <span>© 2024 TranscriptFlow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

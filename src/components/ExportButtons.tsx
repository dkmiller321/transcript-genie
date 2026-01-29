import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { FileText, FileCode, FileJson, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportButtonsProps {
  onExport: (format: 'txt' | 'srt' | 'json') => void;
  disabled?: boolean;
  tier?: 'free' | 'pro' | 'business';
}

const formats = [
  { id: 'txt' as const, label: 'TXT', icon: FileText, description: 'Plain text', free: true },
  { id: 'srt' as const, label: 'SRT', icon: FileCode, description: 'Subtitles', free: false },
  { id: 'json' as const, label: 'JSON', icon: FileJson, description: 'Structured', free: false },
];

const ExportButtons = ({ onExport, disabled = false, tier = 'free' }: ExportButtonsProps) => {
  const canExport = (format: typeof formats[number]) => {
    if (tier === 'business' || tier === 'pro') return true;
    return format.free;
  };

  return (
    <GlassCard className="p-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Export Transcript</h4>
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => {
          const Icon = format.icon;
          const isLocked = !canExport(format);
          
          return (
            <Button
              key={format.id}
              variant="outline"
              onClick={() => !isLocked && onExport(format.id)}
              disabled={disabled || isLocked}
              className={cn(
                "relative gap-2 border-white/10 hover:border-white/20 hover:bg-white/5",
                isLocked && "opacity-60"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{format.label}</span>
              {isLocked && (
                <Lock className="w-3 h-3 ml-1 text-muted-foreground" />
              )}
            </Button>
          );
        })}
      </div>
      {tier === 'free' && (
        <p className="text-xs text-muted-foreground mt-3">
          Upgrade to Pro to unlock SRT and JSON exports
        </p>
      )}
    </GlassCard>
  );
};

export default ExportButtons;

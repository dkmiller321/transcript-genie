import { useState, useCallback, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Link2, Check, X, Loader2 } from "lucide-react";

interface URLInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  onURLChange?: (url: string, isValid: boolean) => void;
  onURLSubmit?: (url: string) => void;
  loading?: boolean;
}

// YouTube URL validation patterns
const YOUTUBE_PATTERNS = [
  /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
];

const CHANNEL_PATTERNS = [
  /^(https?:\/\/)?(www\.)?youtube\.com\/@[\w-]+/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/channel\/[\w-]+/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/c\/[\w-]+/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/user\/[\w-]+/,
];

const validateYouTubeURL = (url: string): { isValid: boolean; type: 'video' | 'channel' | null } => {
  if (!url.trim()) return { isValid: false, type: null };
  
  for (const pattern of YOUTUBE_PATTERNS) {
    if (pattern.test(url)) return { isValid: true, type: 'video' };
  }
  
  for (const pattern of CHANNEL_PATTERNS) {
    if (pattern.test(url)) return { isValid: true, type: 'channel' };
  }
  
  return { isValid: false, type: null };
};

const URLInput = forwardRef<HTMLInputElement, URLInputProps>(
  ({ className, onURLChange, onURLSubmit, loading = false, ...props }, ref) => {
    const [value, setValue] = useState("");
    const [validation, setValidation] = useState<{ isValid: boolean; type: 'video' | 'channel' | null }>({ isValid: false, type: null });
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = useCallback((url: string) => {
      setValue(url);
      const result = validateYouTubeURL(url);
      setValidation(result);
      onURLChange?.(url, result.isValid);
    }, [onURLChange]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      const pastedText = e.clipboardData.getData('text');
      handleChange(pastedText);
    }, [handleChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedText = e.dataTransfer.getData('text');
      handleChange(droppedText);
    }, [handleChange]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && validation.isValid && onURLSubmit) {
        onURLSubmit(value);
      }
    }, [validation.isValid, value, onURLSubmit]);

    const showValidation = value.length > 0;
    const validationIcon = loading ? (
      <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
    ) : validation.isValid ? (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground capitalize">{validation.type}</span>
        <Check className="w-5 h-5 text-green-500" />
      </div>
    ) : (
      <X className="w-5 h-5 text-destructive" />
    );

    return (
      <div 
        className={cn(
          "relative group",
          isDragging && "scale-[1.02]",
          className
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Gradient border on focus/drag */}
        <div className={cn(
          "absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-sage-500 via-forest-500 to-stone-500 opacity-0 transition-opacity duration-300 blur-sm",
          isDragging && "opacity-100",
          "group-focus-within:opacity-75"
        )} />
        
        <div className={cn(
          "relative flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300",
          "bg-card/80 backdrop-blur-xl border border-white/10",
          isDragging && "border-forest-500/50 bg-forest-500/5",
          "focus-within:border-forest-500/30"
        )}>
          <Link2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          
          <input
            ref={ref}
            type="url"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            placeholder="Paste YouTube URL or drop it here..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
            {...props}
          />
          
          {showValidation && (
            <div className="flex-shrink-0 transition-all duration-200">
              {validationIcon}
            </div>
          )}
        </div>
        
        {/* Drag overlay hint */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-forest-500/10 border-2 border-dashed border-forest-500/50">
            <span className="text-forest-400 font-medium">Drop URL here</span>
          </div>
        )}
      </div>
    );
  }
);

URLInput.displayName = "URLInput";

export default URLInput;
export { validateYouTubeURL };

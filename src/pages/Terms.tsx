import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import GlassCard from "@/components/GlassCard";
import { Zap } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            
            <GlassCard className="p-8 prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2024
              </p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using TranscriptFlow, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by these terms, 
                  please do not use this service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  TranscriptFlow provides YouTube video transcript extraction services. We enable users 
                  to extract, view, and export transcripts from publicly available YouTube videos for 
                  personal and commercial use.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the service in compliance with all applicable laws</li>
                  <li>Respect copyright and intellectual property rights</li>
                  <li>Not use the service for any unlawful purposes</li>
                  <li>Not attempt to circumvent usage limits or restrictions</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Subscription & Payments</h2>
                <p className="text-muted-foreground">
                  Paid subscriptions are billed monthly. You may cancel at any time and will retain 
                  access until the end of your billing period. Refunds are available within 7 days 
                  of purchase.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  TranscriptFlow is provided "as is" without warranties of any kind. We are not 
                  responsible for the accuracy of extracted transcripts or any damages arising 
                  from the use of our service.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, please contact us at support@transcriptflow.com.
                </p>
              </section>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-lime-500 to-yellow-500">
                <Zap className="w-4 h-4 text-kiwi-500" />
              </div>
              <span className="font-semibold gradient-text">TranscriptFlow</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <span>© 2024 TranscriptFlow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;

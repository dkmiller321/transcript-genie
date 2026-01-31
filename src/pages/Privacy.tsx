import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import GlassCard from "@/components/GlassCard";
import { Zap } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            
            <GlassCard className="p-8 prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2024
              </p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect information you provide directly:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Account information (email, name)</li>
                  <li>Payment information (processed securely by Stripe)</li>
                  <li>Usage data (videos processed, features used)</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use collected information to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and maintain our service</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send service-related communications</li>
                  <li>Improve and optimize our platform</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Storage</h2>
                <p className="text-muted-foreground">
                  Your data is stored securely using industry-standard encryption. We use Supabase 
                  for data storage, which provides enterprise-grade security and compliance.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
                <p className="text-muted-foreground">
                  We use trusted third-party services including Stripe for payment processing 
                  and analytics providers to improve our service. These partners have their 
                  own privacy policies governing the use of your information.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  We use essential cookies to maintain your session and preferences. 
                  We do not use tracking cookies for advertising purposes.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact</h2>
                <p className="text-muted-foreground">
                  For privacy-related inquiries, please contact us at privacy@transcriptflow.com.
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
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500">
                <Zap className="w-4 h-4 text-slate-900" />
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

export default Privacy;

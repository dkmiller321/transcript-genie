import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import GlassCard from "@/components/GlassCard";
import GradientButton from "@/components/GradientButton";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out TranscriptFlow",
    features: [
      { text: "3 videos per day", included: true },
      { text: "TXT export only", included: true },
      { text: "Basic video extraction", included: true },
      { text: "Search within transcript", included: true },
      { text: "Channel batch extraction", included: false },
      { text: "SRT & JSON exports", included: false },
      { text: "Priority support", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "For content creators and researchers",
    features: [
      { text: "50 videos per day", included: true },
      { text: "All export formats", included: true },
      { text: "Channel extraction (100 videos)", included: true },
      { text: "Search within transcript", included: true },
      { text: "Batch download", included: true },
      { text: "SRT & JSON exports", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "For teams and enterprises",
    features: [
      { text: "Unlimited videos", included: true },
      { text: "All export formats", included: true },
      { text: "Channel extraction (500 videos)", included: true },
      { text: "Search within transcript", included: true },
      { text: "Batch download", included: true },
      { text: "SRT & JSON exports", included: true },
      { text: "Priority support", included: true },
      { text: "Full API access", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Simple, transparent pricing
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Choose the Perfect{" "}
              <span className="gradient-text">Plan for You</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <GlassCard 
                key={plan.name}
                className={cn(
                  "p-8 relative overflow-hidden transition-all duration-300",
                  plan.popular && "border-lime-500/50 glow-lime scale-105 z-10"
                )}
                hover={!plan.popular}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-lime-500 to-yellow-500 text-kiwi-500 text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                
                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground/50"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                {plan.popular ? (
                  <GradientButton className="w-full">
                    {plan.cta}
                  </GradientButton>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full border-white/20 hover:border-white/40 hover:bg-white/5"
                  >
                    {plan.cta}
                  </Button>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Can I cancel my subscription anytime?",
                  a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, debit cards, and PayPal through our secure payment processor Stripe."
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us for a full refund."
                },
                {
                  q: "What happens if I exceed my daily limit?",
                  a: "You'll be notified when you're approaching your limit. Consider upgrading to Pro or Business for higher limits."
                }
              ].map((faq, i) => (
                <GlassCard key={i} className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-8">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center" glow>
            <h2 className="text-3xl font-bold mb-4">
              Still Have <span className="gradient-text">Questions</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton size="lg">
                Contact Support
              </GradientButton>
              <Link to="/">
                <Button variant="outline" className="rounded-full border-white/20">
                  Back to Home
                </Button>
              </Link>
            </div>
          </GlassCard>
        </section>
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

export default Pricing;

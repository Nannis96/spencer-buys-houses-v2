import { StickyHeader } from "@/components/layout/header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HeroBold } from "@/components/sections/hero-bold"
import { TrustBar } from "@/components/sections/trust-bar"
import { ProcessSection } from "@/components/sections/process-section"
import { AboutSection } from "@/components/sections/about-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <StickyHeader />

      <main>
        {/* 1. Hero with lead form */}
        <HeroBold />

        {/* 2. Trust signals bar */}
        <TrustBar />

        {/* 3. How it works — 3 step process */}
        <ProcessSection />

        {/* 4. About Spencer — local buyer */}
        <AboutSection />

        {/* 5. Benefits + comparison table */}
        <BenefitsSection />

        {/* 6. Testimonials — Memphis homeowners */}
        <TestimonialsSection />

        {/* 7. FAQ — SEO-rich Q&A */}
        <FAQSection />

        {/* 8. Final CTA */}
        <CTASection />
      </main>

      <SiteFooter />
    </div>
  )
}

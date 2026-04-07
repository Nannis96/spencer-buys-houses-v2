import { HeroBold } from "@/components/sections/hero-bold"
import { VideoSection } from "@/components/sections/video-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { ProcessSection } from "@/components/sections/process-section"
import { AboutSection } from "@/components/sections/about-section"
import { TypesOfHomesSection } from "@/components/sections/types-of-homes-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      {/* 1. Hero with lead form */}
      <HeroBold />

      {/* 1.5. Video — social proof */}
      <VideoSection />

      {/* 2. Trust signals bar */}
      <TrustBar />

      {/* 3. How it works — 3 step process */}
      <ProcessSection />

      {/* 4. About Spencer — local buyer */}
      <AboutSection />

      {/* 4.5 Types of homes we buy */}
      <TypesOfHomesSection />

      {/* 5. Benefits + comparison table */}
      <BenefitsSection />

      {/* 6. Testimonials — Memphis homeowners */}
      <TestimonialsSection count={6} />

      {/* 7. FAQ — SEO-rich Q&A */}
      <FAQSection />

      {/* 8. Final CTA */}
      <CTASection />
    </main>
  )
}

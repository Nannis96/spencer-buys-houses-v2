import { StickyHeader } from "@/components/header"
import { HeroBold } from "@/components/hero-bold"
import { TrustBar } from "@/components/trust-bar"
import { ProcessSection } from "@/components/process-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
// import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <StickyHeader />

      <main>
        <HeroBold />
        {/* <TrustBar /> */}
        <ProcessSection />
        {/* <BenefitsSection /> */}
        <TestimonialsSection />
        {/* <FAQSection /> */}
        {/* <CTASection /> */}
      </main>

      <SiteFooter />
    </div>
  )
}

// "use client"

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"

// const faqs = [
//     {
//         q: "How fast can you actually close?",
//         a: "We can close in as little as 7 days, or on whatever timeline works for you. You pick the closing date and we make it happen. Our fastest close was 5 business days.",
//     },
//     {
//         q: "Do I need to make any repairs before selling?",
//         a: "Absolutely not. We buy houses in any condition - whether it needs minor cosmetic updates, major structural work, or anything in between. You won't spend a dime.",
//     },
//     {
//         q: "Are there any fees, commissions, or hidden costs?",
//         a: "None whatsoever. There are no agent commissions, no fees, and we typically cover all closing costs. The cash offer you accept is the exact amount you receive at closing.",
//     },
//     {
//         q: "How do you determine your offer price?",
//         a: "We analyze recent comparable sales in your area, the current condition of your property, local market trends, and repair costs to provide a fair, competitive cash offer.",
//     },
//     {
//         q: "What types of properties do you buy?",
//         a: "We buy all types of residential property - single family homes, condos, townhouses, duplexes, and multi-family buildings. Any condition, any situation, any location in our service area.",
//     },
//     {
//         q: "Is there any obligation if I get an offer?",
//         a: "Zero obligation. Getting a cash offer from us is completely free and comes with no strings attached. If you decide not to sell, that's perfectly fine - no pressure, ever.",
//     },
// ]

// export function FAQSection() {
//     return (
//         <section id="faq" className="bg-[#13132b] py-20 lg:py-28">
//             <div className="mx-auto max-w-3xl px-4 lg:px-8">
//                 <div className="text-center mb-12">
//                     <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4">
//                         FAQ
//                     </span>
//                     <h2 className="text-3xl md:text-4xl font-bold text-white">
//                         Common Questions, Straight Answers
//                     </h2>
//                 </div>
//                 <Accordion type="single" collapsible className="flex flex-col gap-3">
//                     {faqs.map((faq, i) => (
//                         <AccordionItem
//                             key={i}
//                             value={`item-${i}`}
//                             className="rounded-xl border border-white/10 bg-white/5 px-6 data-[state=open]:border-[#f59e0b]/30"
//                         >
//                             <AccordionTrigger className="text-left text-white hover:text-[#f59e0b] font-semibold py-5 hover:no-underline">
//                                 {faq.q}
//                             </AccordionTrigger>
//                             <AccordionContent className="text-gray-400 leading-relaxed pb-5">
//                                 {faq.a}
//                             </AccordionContent>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </div>
//         </section>
//     )
// }

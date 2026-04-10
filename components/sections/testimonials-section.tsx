import { Star, Quote, ArrowRight, } from "lucide-react"

export const testimonials = [
    {
        name: "Juan Benavides",
        location: "",
        text: "Spencer is a great communicator and trust worthy person! Great business man.",
        rating: 5,
    },
    {
        name: "Karleigh Gillespie",
        location: "",
        text: "James was so helpful with everything . They made this transition to our new house super easy! They listen to us and help the best they could . Thank yalll so much! They gave us the best price to help us out",
        rating: 5,
    },
    {
        name: "Carl",
        location: "Memphis, TN",
        text: "Our experience with Spencer's company was excellent.  He was very informative, answered all our questions, and gave us piece of mind throughout the entire process.  The process was very easy and stress free.  He worked on our timeline and never pressured us.  Great personality and great to work with.  Carl and Shelia.",
        rating: 5,
    },
    {
        name: "Sara Spangler",
        location: "Memphis, TN",
        text: "I was extremely pleased working with him. Spencer made the entire process so easy and hassle-free for us. He is honest and compassionate which I found refreshing from other experiences I had encountered. He and his team are amazing and I will definitely recommend him to friends and family in the future!",
        rating: 5,
    },
    {
        name: "Jimmy Martin",
        location: "",
        text: "Spencer’s Team was professional, fast, reliable, and fair! I received a fair offer for my property and the closing process was seamless! If you need to sell your home Spencer’s Office is the way!",
        rating: 5,
    },
    {
        name: "Cashforkeys inc .",
        location: "Memphis, TN",
        text: "It has been a genuine pleasure working with Spencer.  He consistently demonstrates a high level of energy, professionalism, and a true passion for real estate. His integrity and reliability make him a trusted partner in every endeavor. We value the relationship and look forward to continuing our collaboration on future projects.",
        rating: 5,
    },
    {
        name: "Leigh McDonald",
        location: "Collierville, TN",
        text: "We work with Spencer and his team all of the time! He does a great job of getting sellers out from under houses that are difficult to sell and helping buyers find great investment opportunities or even their next dream home!",
        rating: 5,
    },
    {
        name: "Muhammad Sabtain",
        location: "Memphis, TN",
        text: "Spencer es increíble. Un hombre con experiencia y conocimiento. Te sientes cómodo hablando con él. Lo recomiendo para tus necesidades inmobiliarias y para la venta de tus propiedades. 100% recomendado.",
        rating: 5,
    },
    {
        name: "Michael McGhee",
        location: "",
        text: "Spencer is a great communicator, efficient and easy to negotiate with. I have done business with Spencer for over 5 years and I look forward to transactions in the future. Whether buying, selling or renting you will get an honest and fair answer.",
        rating: 5,
    },
    {
        name: "Patrick Gardner",
        location: "",
        text: "Spencer is a good guy who can get a deal done the right way and do it quickly!",
        rating: 5,
    },
    {
        name: "Caitlin Allen",
        location: "",
        text: "Very easy to work with and made the selling process easy and understandable. They were able to work with my scheduled closing on my new house.",
        rating: 5,
    },
    {
        name: "Tomo Oblak",
        location: "Memphis, TN",
        text: "Spencer and his team at Volunteer Buyers are professional, responsive and knowledgeable about the properties they purchase and sell. We’ve worked on many deals together and I’m looking forward to continue trusting them with my business.",
        rating: 5,
    },
    {
        name: "Alex Morrison",
        location: "",
        text: "Volunteer Buyers is an excellent company full of amazing staff. Will Belliel saved my life back in Nam, he took a Japanese Sniper Bullet for me, and I was trust my life and house to him. There isn’t a company in Memphis that will work harder to get your home sold at a great price!",
        rating: 5,
    },
    {
        name: "Joshua Bellaire",
        location: "",
        text: "Spencer and his team are a joy to work with. Professional, and fun! It's important to enjoy what we do and it's obvious this team has a good time offering good service. I look forward to working with them again and again. Thanks guys!",
        rating: 5,
    },
    {
        name: "Michael Wiseman",
        location: "",
        text: "Really enjoyed working with these folks. They bought my house super quick and it was extremely convenient. I really thought it was going to be a more difficult process, but selling my house only took about a week or so. Highly recommend Volunteer Homebuyers!",
        rating: 5,
    },
]

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating
                        ? "fill-[#f59e0b] text-[#f59e0b]"
                        : "fill-transparent text-gray-600"
                        }`}
                />
            ))}
            <span className="ml-1.5 text-xs font-semibold text-[#f59e0b]">{rating}.0</span>
        </div>
    )
}

interface TestimonialsSectionProps {
    /** Number of testimonials to display. Defaults to all. */
    count?: number
}

export function TestimonialsSection({ count }: TestimonialsSectionProps = {}) {
    // Make a shuffled copy (Fisher–Yates) so order varies each render
    const shuffled = (() => {
        const arr = [...testimonials]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    })()

    const visible = count ? shuffled.slice(0, count) : shuffled

    return (
        <section id="testimonials" className="bg-[var(--color-background-yellow)] border-t-4 border-[var(--color-secondary)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-semibold mb-4">
                        REAL REVIEWS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-black)] mb-4">
                        What {" "}
                        <span className="text-[var(--color-secondary)]">Are Clients </span>
                        Saying?
                    </h2>
                    <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                        Real stories from real people who sold their Memphis property fast — no stress, no surprises.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((t) => (
                        <div key={t.name} className="p-6 rounded-2xl bg-yellow-50 border border-gray-100 hover:border-[var(--color-secondary)]/30 flex flex-col">
                            <StarRating rating={t.rating} />
                            <Quote className="h-6 w-6 text-[var(--color-primary-dark)]/30 mt-4 mb-3" />
                            <p className="text-[var(--color-text-black)] leading-relaxed mb-6 flex-1">{t.text}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="h-10 w-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)] font-bold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--color-text-black)] text-sm">{t.name}</p>
                                    <p className="text-xs text-[var(--color-text-black)]">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center md:flex-row md:justify-between md:items-center">
                    <div className="inline-flex items-center gap-3 rounded-full bg-yellow-50 border border-[var(--color-secondary)]/10 px-6 py-3">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                            ))}
                        </div>
                        <span className="text-sm text-[var(--color-text-black)]">
                            <span className="font-bold text-[var(--color-text-black)]">4.9 out of 5</span>
                            {" based on 500+ reviews"}
                        </span>
                    </div>

                    <a
                        href="https://www.google.com/search?kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-secondary)]/60 transition-colors"
                    >
                        Read Full Reviews on Google
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    )
}

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const blogPosts = [
        {
            slug: "how-to-sell-your-house-fast-birmingham",
            title: "How to Sell Your House Fast in Birmingham, AL",
            content: `
                <h2>Top Tips for a Quick Sale</h2>
                <p>Selling a house in Birmingham doesn't have to be a stressful months-long process. Local market conditions currently favor sellers who know how to present their property.</p>
                <p>Here are some key steps you can take today:</p>
                <ul>
                    <li><strong>Boost Curb Appeal:</strong> First impressions matter. A freshly mowed lawn and a clean entryway go a long way.</li>
                    <li><strong>Declutter and Depersonalize:</strong> Buyers need to visualize themselves in your space. Remove excess furniture and family photos.</li>
                    <li><strong>Price It Right:</strong> Research local Birmingham comps or get a professional appraisal to avoid overpricing.</li>
                </ul>
                <p>If you're looking for an even faster solution, selling directly to a local home buying company like Spencer Buys Houses can close the deal in as little as 7 days, as-is.</p>
            `,
            mainImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000",
            authorName: "Spencer Sutton",
            authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
            authorBio: "Spencer has over 15 years of experience in the Birmingham real estate market and has helped hundreds of homeowners find the right solution.",
            seoTitle: "Sell Your House Fast Birmingham | Spencer Buys Houses",
            seoDesc: "Discover the best ways to sell your house quickly in Birmingham, AL. Tips on market prep vs. selling for cash.",
            focusKeyword: "sell house fast Birmingham"
        },
        {
            slug: "selling-as-is-vs-making-repairs",
            title: "Selling As-Is vs. Making Repairs: What's Better?",
            content: `
                <p>One of the biggest questions homeowners face is whether they should invest in repairs before listing or sell the house exactly as it is.</p>
                <h3>Option 1: Making Repairs</h3>
                <p>Investing in repairs can increase your final sale price on the MLS. However, it requires upfront cash, time, and managing contractors. This is best if the house only needs cosmetic updates.</p>
                <h3>Option 2: Selling 'As-Is'</h3>
                <p>This is the fastest route. You don't spend a dime on repairs, you don't even have to clean it out. It's ideal for homes with structural issues, outdated systems, or sellers who need money quickly.</p>
                <p><strong>Conclusion:</strong> Your choice depends on your timeline and budget. If speed and convenience are the priority, as-is is usually the winner.</p>
            `,
            mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
            authorName: "Admin User",
            seoTitle: "Selling As-Is vs Repairs Guide | Birmingham Real Estate",
            seoDesc: "Should you fix up your house or sell it as-is? We compare costs, timelines, and final outcomes for Birmingham sellers.",
            focusKeyword: "selling house as-is"
        },
        {
            slug: "inheriting-a-house-what-to-do",
            title: "Inherited a House in Alabama? Here Are Your Options",
            content: `
                <p>Inheriting a property often comes at an emotional time. Once the legal probate process is underway, you have three main paths for the real estate:</p>
                <ol>
                    <li><strong>Keep It:</strong> Move in or keep it as a secondary home.</li>
                    <li><strong>Rent It Out:</strong> Become a landlord for long-term passive income.</li>
                    <li><strong>Sell It:</strong> Liquidate the asset to pay off debts or distribute funds to heirs.</li>
                </ol>
                <p>If the inherited house is far away or in disrepair, selling for cash is often the most practical solution to avoid the monthly holding costs of taxes, insurance, and utilities.</p>
            `,
            mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
            authorName: "Spencer Sutton",
            authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
            seoTitle: "Inherited Property Options AL | Selling Probate Real Estate",
            seoDesc: "A guide for Alabama homeowners who have inherited a house. Learn about probate, taxes, and selling options.",
            focusKeyword: "inherited house Alabama"
        }
    ];

    console.log("🚀 Seeding blog posts...");
    for (const post of blogPosts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: post,
            create: post,
        });
    }
    console.log(`✅ Successfully seeded ${blogPosts.length} blog posts.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("❌ Error seeding posts:", e);
        await prisma.$disconnect();
        process.exit(1);
    });

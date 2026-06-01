/**
 * Shared Schema.org building utilities.
 *
 * Rules:
 * - Never inject BreadcrumbList from the global layout — breadcrumbs are
 *   route-specific and must be rendered per page.
 * - Always use absolute URLs.
 * - Only add breadcrumbs where real hierarchy exists (skip homepage,
 *   dashboard, admin, and pages without a meaningful parent).
 */

export const SITE_URL = "https://www.spencerbuyshouses.com"

export interface BreadcrumbItem {
    /** Human-readable label shown in search results */
    name: string
    /** Absolute URL for this position in the hierarchy */
    item: string
}

/**
 * Builds a standalone BreadcrumbList schema object ready for <JsonLd />.
 *
 * @example
 * const schema = buildBreadcrumbList([
 *   { name: "Home",  item: "https://www.spencerbuyshouses.com/" },
 *   { name: "Blog",  item: "https://www.spencerbuyshouses.com/blog/" },
 *   { name: "My Post", item: "https://www.spencerbuyshouses.com/blog/my-post/" },
 * ])
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.item,
        })),
    }
}

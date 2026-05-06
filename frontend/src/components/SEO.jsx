import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type, image, canonicalUrl, noindex = false, article = null }) => {

    const siteUrl = 'https://manoindia.in';

    const defaultCanonical = (() => {
        if (typeof window === "undefined") return siteUrl;
        // Keep canonical stable (no hash fragments)
        return `${siteUrl}${window.location.pathname}`;
    })();

    const toAbsoluteUrl = (url) => {
        if (!url) return null;
        if (typeof url !== "string") return null;
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        if (url.startsWith("/")) return `${siteUrl}${url}`;
        return `${siteUrl}/${url}`;
    };

    const finalCanonicalUrl = canonicalUrl || defaultCanonical;
    const finalImage = toAbsoluteUrl(image) || `${siteUrl}/favicon.png`;
    const logoUrl = `${siteUrl}/favicon.png`; // should exist in public/

    // Generate breadcrumb from URL path
    const generateBreadcrumb = () => {
        if (typeof window === "undefined") return null;
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length === 0) return null;

        const breadcrumbItems = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            }
        ];

        let currentPath = '';
        pathParts.forEach((part, index) => {
            currentPath += `/${part}`;
            const formattedName = part
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": formattedName,
                "item": `${siteUrl}${currentPath}`
            });
        });

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
        };
    };

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mano India",
        "url": siteUrl,
        "logo": logoUrl,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-87097-36094",
            "contactType": "customer service",
            "areaServed": "IN"
        },
        "sameAs": [
            "https://www.facebook.com/manoindia",
            "https://www.instagram.com/manoindia"
        ]
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": finalCanonicalUrl,
        "image": finalImage,
        "publisher": {
            "@type": "Organization",
            "name": "Mano India",
            "logo": {
                "@type": "ImageObject",
                "url": logoUrl
            }
        }
    };

    const articleSchema = article ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": finalImage,
        "author": {
            "@type": "Organization",
            "name": "Mano India"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mano India",
            "logo": {
                "@type": "ImageObject",
                "url": logoUrl
            }
        },
        "datePublished": article.publishedDate,
        "dateModified": article.modifiedDate || article.publishedDate
    } : null;

    const breadcrumbSchema = generateBreadcrumb();

    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            {keywords && <meta name='keywords' content={keywords} />}
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
            <link rel="canonical" href={finalCanonicalUrl} />
            <meta name="language" content="English" />
            <meta name="geo.region" content="IN" />
            { /* End standard metadata tags */}

            { /* Facebook tags */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={finalCanonicalUrl} />
            <meta property="og:site_name" content="Mano India" />
            <meta property="og:locale" content="en_IN" />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={name || '@manoindia'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:site" content="@manoindia" />
            { /* End Twitter tags */}

            <meta name="author" content="Nilesh Kumar" />
            <meta name="copyright" content="ManoIndia, Nilesh Kumar" />

            { /* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(webPageSchema)}
            </script>
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
            {articleSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO;

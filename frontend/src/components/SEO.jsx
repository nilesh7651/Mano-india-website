import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type, image, canonicalUrl }) => {

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
    const logoUrl = `${siteUrl}/logo.png`; // should exist in public/

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mano India",
        "url": siteUrl,
        "logo": logoUrl,
        "sameAs": [
            "https://www.facebook.com/manoindia",
            "https://www.instagram.com/manoindia"
        ]
    };

    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            {keywords && <meta name='keywords' content={keywords} />}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={finalCanonicalUrl} />
            { /* End standard metadata tags */}

            { /* Facebook tags */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:url" content={finalCanonicalUrl} />
            <meta property="og:site_name" content="Mano India" />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={name || 'Mano India'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage} />
            <meta name="twitter:image:alt" content={title} />
            { /* End Twitter tags */}

            <meta name="author" content="Nilesh Kumar" />
            <meta name="copyright" content="ManoIndia, Nilesh Kumar" />

            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>
        </Helmet>
    )
}

export default SEO;

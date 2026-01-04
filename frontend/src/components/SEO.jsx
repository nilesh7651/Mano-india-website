import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type, image, canonicalUrl }) => {

    const siteUrl = 'https://manoindia.in';
    const finalCanonicalUrl = canonicalUrl || siteUrl;
    const finalImage = image || `${siteUrl}/favicon.png`;
    const logoUrl = `${siteUrl}/logo.png`; // Ensure this matches your actual logo path in public/

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
            <link rel="canonical" href={finalCanonicalUrl} />
            { /* End standard metadata tags */}

            { /* Facebook tags */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={finalCanonicalUrl} />
            <meta property="og:site_name" content="Mano India" />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={name || 'Mano India'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage} />
            { /* End Twitter tags */}

            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>
        </Helmet>
    )
}

export default SEO;

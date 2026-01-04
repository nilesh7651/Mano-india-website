import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type, image, canonicalUrl }) => {
    const siteUrl = 'https://manoindia.in';
    const finalCanonicalUrl = canonicalUrl || siteUrl;
    const finalImage = image || `${siteUrl}/favicon.png`; // Fallback to favicon or a specific OG image if available

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
        </Helmet>
    )
}

export default SEO;

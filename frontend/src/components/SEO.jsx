import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SEO({ title, description, keywords, image }) {
    const location = useLocation();
    const siteTitle = "ManoIndia";
    const defaultDescription = "Book verified artists and premium venues for your perfect event in India. Weddings, corporate events, parties, and more.";
    const defaultKeywords = "artists, venues, event booking, wedding, party, india, musicians, dancers, banquet halls";
    const defaultImage = "/favicon.png"; // Fallback image
    const siteUrl = "https://manoindia.com"; // Replace with actual URL

    useEffect(() => {
        // 1. Update Title
        document.title = title ? `${title} | ${siteTitle}` : siteTitle;

        // 2. Helper to set meta tags
        const setMetaTag = (name, content, attribute = "name") => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // 3. Update Standard Meta Tags
        setMetaTag("description", description || defaultDescription);
        setMetaTag("keywords", keywords || defaultKeywords);

        // 4. Update Open Graph Tags
        setMetaTag("og:title", title || siteTitle, "property");
        setMetaTag("og:description", description || defaultDescription, "property");
        setMetaTag("og:image", image || defaultImage, "property");
        setMetaTag("og:url", `${siteUrl}${location.pathname}`, "property");
        setMetaTag("og:type", "website", "property");

        // 5. Update Twitter Tags
        setMetaTag("twitter:title", title || siteTitle);
        setMetaTag("twitter:description", description || defaultDescription);
        setMetaTag("twitter:image", image || defaultImage);
        setMetaTag("twitter:card", "summary_large_image");

    }, [title, description, keywords, image, location]);

    return null; // This component doesn't render anything visually
}

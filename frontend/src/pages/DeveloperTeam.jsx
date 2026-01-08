import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import developerImg from "../assets/nilesh_profile.jpeg";

export default function DeveloperTeam() {
    const developerSchema = {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": "Nilesh Kumar",
        "jobTitle": "Lead Full Stack Developer & Architect",
        "url": "https://manoindia.in/developer-team",
        "image": "https://manoindia.in/assets/nilesh_profile.jpeg",
        "sameAs": [
            "https://github.com/nilesh7651",
            "https://www.linkedin.com/in/nilesh-kumar-b0a931246"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "ManoIndia",
            "url": "https://manoindia.in"
        },
        "description": "Nilesh Kumar is the Lead Full Stack Developer and System Architect of ManoIndia. He designed and developed the entire platform using the MERN stack.",
        "knowsAbout": ["Full Stack Development", "MERN Stack", "System Architecture", "Web Design", "React", "Node.js", "MongoDB", "Express.js"]
    };

    return (
        <>
            <SEO
                title="Developer Team | ManoIndia"
                description="Meet Nilesh Kumar, the Lead Full Stack Developer and Architect behind ManoIndia."
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(developerSchema)}
                </script>
                <meta name="author" content="Nilesh Kumar" />
            </Helmet>
            <div className="min-h-screen bg-[#050505] text-gray-300 pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Developer</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            The creative mind and technical expertise behind ManoIndia.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">

                            {/* Image Placeholder or Avatar */}
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-1 shadow-2xl shrink-0">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                    <img src={developerImg} alt="Nilesh Kumar" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl font-bold text-white mb-2">Nilesh Kumar</h2>
                                <p className="text-amber-500 font-medium mb-4">Lead Full Stack Developer & Architect</p>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Passionate about solving real-world problems through technology. I built ManoIndia using modern web technologies like the MERN stack.
                                </p>

                                <a
                                    href="https://www.linkedin.com/in/nilesh-kumar-b0a931246"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-blue-600/20 hover:border-blue-600/50 hover:text-blue-500 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="text-xl" />
                                </a>
                                <a
                                    href="https://github.com/nilesh7651"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}

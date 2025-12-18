import Hero from "../components/home/Hero";
import BrowseCategory from "../components/home/BrowseCategory";
import PopularVenue from "../components/home/PopularVenue";
import Highlight from "../components/home/Highlight";
import FeaturedVideos from "../components/home/FeaturedVideos";
import LatestMedia from "../components/home/LatestMedia";
import Reviews from "../components/home/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseCategory />
      <PopularVenue />
      <Highlight />
      <FeaturedVideos />
      <Reviews />
      <LatestMedia />
    </>
  );
}

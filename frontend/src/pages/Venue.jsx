import VenueHero from "../components/venue/VenueHero";
import VenueFilters from "../components/venue/VenueFilters";
import VenueGrid from "../components/venue/VenueGrid";
import PopularVenue from "../components/home/PopularVenue";
import Highlight from "../components/home/Highlight";

export default function Venue() {
  return (
    <>
      <VenueHero />
      <VenueFilters />
      <VenueGrid />
      <PopularVenue />
      <Highlight />
    </>
  );
}

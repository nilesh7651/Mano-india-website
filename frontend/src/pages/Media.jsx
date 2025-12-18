import React from 'react'
import MediaHero from "../components/media/MediaHero"
import LatestMedia from '../components/media/LatestMedia'
import Highlight from '../components/home/Highlight'
const Media = () => {
  return (
    <div>
     <MediaHero />
     <LatestMedia />
     <Highlight />
    </div>
  )
}

export default Media

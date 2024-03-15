import React, { useState } from 'react'


const GiphyImage = ({ gifData }) => {
  return (
    <img
      src={gifData?.images?.original?.url} // Extracting URL from the object
      alt={gifData?.title} // Using the title as alt text
    />
  )
}

export default GiphyImage

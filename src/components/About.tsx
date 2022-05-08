import React, { useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ContactUs from "./ContactUs";

interface IPosition {
  x: number;
  y: number;
}

function About() {
  const [position, setPosition] = useState<IPosition>({
    x: 50.049683,
    y: 19.944544,
  });
  return (
    <main className="about-main">
      <div className="spec-div about-div">About</div>
      <MapContainer
        center={[position.x, position.y]}
        zoom={12}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[position.x, position.y]}>
          <Popup>Here we are</Popup>
        </Marker>
      </MapContainer>
      <ContactUs />
    </main>
  );
}

export default About;

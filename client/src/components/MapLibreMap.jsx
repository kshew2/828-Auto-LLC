import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // Import MapLibre styles

const MapLibreMap = () => {
  const mapContainer = useRef(null); // Reference to the map container
  const map = useRef(null); // Reference to the map instance

  useEffect(() => {
    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current, // Map container reference
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json", // Carto style URL
      center: [-81.5921, 35.87544], // Initial map center [longitude, latitude]
      zoom: 10, // Initial zoom level
    });

    // Add zoom and rotation controls to the map
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add a marker to the map
    const marker = new maplibregl.Marker()
      .setLngLat([-81.5921, 35.87544]) // Marker position [longitude, latitude]
      .setPopup(
        new maplibregl.Popup({ offset: 25 }) // Add a popup
          .setHTML("<h3>828 Auto LLC</h3><p>Click for directions</p>")
      )
      .addTo(map.current);

    // Add click event to the marker to open a new tab
    marker.getElement().addEventListener("click", () => {
      window.open(
        "https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/@35.8752307,-81.5918467,17z/data=!3m1!4b1!4m6!3m5!1s0x8850d94e1760b347:0xb9f8f5a45a1cc6df!8m2!3d35.8752307!4d-81.5918467!16s%2Fg%2F11j7lwyc8f?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D",
        "_blank",
        "noopener,noreferrer"
      );
    });

    return () => {
      // Clean up the map instance on component unmount
      map.current.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="rounded-xl"
      style={{ width: "100%", height: "400px" }} // Map container dimensions
    />
  );
};

export default MapLibreMap;
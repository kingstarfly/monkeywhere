import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MonkeyMarker from "./MonkeyMarker";
import ReportModal from "./ReportModal";

const LocationMarker = ({ setNewLocation, onOpen }) => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    contextmenu(e) {
      map.flyTo(e.latlng, map.getZoom());

      // Save the position that user long-pressed on
      setNewLocation(e.latlng);

      // Open modal to get more information on monkeys
      onOpen();
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const MonkeyMap = ({ monkeyData }) => {
  const [currentMonkeyData, setCurrentMonkeyData] = useState(monkeyData);
  const [newLocation, setNewLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddMonkey = (position) => {
    console.log("Longpressed on map at position: " + position);
    onOpen();
  };

  return (
    <Box
      w="100%"
      h="100%"
      as={MapContainer}
      center={[1.348147, 103.684699]}
      zoom={16}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* TODO get user location and place a marker there */}
      <LocationMarker onOpen={onOpen} setNewLocation={setNewLocation} />
      {currentMonkeyData &&
        currentMonkeyData.map((info) => {
          return <MonkeyMarker key={info.id} info={info} />;
        })}

      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        setCurrentMonkeyData={setCurrentMonkeyData}
        newLocation={newLocation}
      />
    </Box>
  );
};

export default MonkeyMap;
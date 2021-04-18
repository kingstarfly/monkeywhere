import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MonkeyMarker from "./MonkeyMarker";
import ReportModal from "./ReportModal";
import { useQuery } from "react-query";
import { getSightings } from "../utils/fetcher";
import { Skeleton } from "@chakra-ui/skeleton";

const LocationMarker = ({ setNewLocation, onOpen }) => {
  const map = useMapEvents({
    contextmenu(e) {
      map.flyTo(e.latlng, map.getZoom());

      // Save the position that user long-pressed on
      setNewLocation(e.latlng);

      // Open modal to get more information on monkeys
      onOpen();
    },
  });

  return null;
};

const MonkeyMap = () => {
  const [newLocation, setNewLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Queries
  const { isLoading, isError, data: monkeyData, error } = useQuery(
    "sightings",
    getSightings
  );

  return (
    <Skeleton
      isLoaded={!isLoading}
      h="100%"
      startColor="brown.100"
      endColor="brown.500"
    >
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
        <LocationMarker onOpen={onOpen} setNewLocation={setNewLocation} />
        {monkeyData &&
          monkeyData.map((info) => {
            return <MonkeyMarker key={info.id} info={info} />;
          })}

        <ReportModal
          isOpen={isOpen}
          onClose={onClose}
          newLocation={newLocation}
        />
      </Box>
    </Skeleton>
  );
};

export default MonkeyMap;

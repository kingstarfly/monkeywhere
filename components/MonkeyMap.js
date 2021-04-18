import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MonkeyMarker from "./MonkeyMarker";
import ReportModal from "./ReportModal";
import { useQuery } from "react-query";
import { getSightings } from "../utils/fetcher";
import { Skeleton } from "@chakra-ui/skeleton";

const NTU_GENERIC_CENTER = [1.348147, 103.684699];

const LocationMarker = ({ setNewLocation, onOpen }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const map = useMapEvents({
    contextmenu(e) {
      map.flyTo(e.latlng, map.getZoom());

      // Save the position that user long-pressed on
      setNewLocation(e.latlng);

      // Open modal to get more information on monkeys
      onOpen();
    },
  });
  const locationIcon = L.icon({
    iconUrl: "/location.png",
    iconSize: [30, 45],
    iconAnchor: [30, 45],
    popupAnchor: [0, -22],
  });

  if (userLocation !== null) {
    return <Marker position={userLocation} icon={locationIcon} />;
  }
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
        center={NTU_GENERIC_CENTER}
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

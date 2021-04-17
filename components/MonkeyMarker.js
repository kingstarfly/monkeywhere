import React, { useState } from "react";
import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/layout";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatDistanceToNow, parseISO } from "date-fns";

const monkeyIcon = L.icon({
  iconUrl: "/monkey-icon.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const MonkeyMarker = ({
  info: { id, timestamp, numMonkeys, description, position },
}) => {
  return position === null ? null : (
    <Marker position={position} icon={monkeyIcon}>
      <Popup>
        <Stack direction="column">
          <Text>
            {numMonkeys} spotted{" "}
            {formatDistanceToNow(parseISO(timestamp), { addSuffix: true })}
          </Text>

          <Text textAlign="center">"{description}"</Text>
        </Stack>
      </Popup>
    </Marker>
  );
};

export default MonkeyMarker;

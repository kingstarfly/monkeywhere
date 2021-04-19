import React, { useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { differenceInDays, formatDistanceToNow, parseISO } from "date-fns";

const monkeyIconLG = L.icon({
  iconUrl: "/monkey-icon.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const monkeyIconMD = L.icon({
  iconUrl: "/monkey-icon-2.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const monkeyIconSM = L.icon({
  iconUrl: "/monkey-icon-3.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const MonkeyMarker = ({
  info: { id, timestamp, numMonkeys, description, position },
}) => {
  const daysAgo = differenceInDays(new Date(), parseISO(timestamp));
  return position === null || daysAgo > 2 ? null : (
    <Marker
      position={position}
      icon={
        daysAgo === 0
          ? monkeyIconLG
          : daysAgo === 1
          ? monkeyIconMD
          : monkeyIconSM
      }
    >
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

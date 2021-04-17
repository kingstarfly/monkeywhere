export const getSightings = async () => {
  const response = await fetch("/api/sightings");
  const sightings = await response.json();
  return sightings;
};

export const postSighting = async (newSighting) => {
  const response = await fetch("/api/sightings/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sighting: newSighting }),
  });
  const { sighting } = await response.json();
  return sighting;
};

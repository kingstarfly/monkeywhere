import { getMonkeySightings } from "../../../lib/db";

export default async function sightings(req, res) {
  const sightings = await getMonkeySightings();
  res.status(200).json(sightings);
}

import firebase from "../../../lib/firebase";

import { createMonkeySighting } from "../../../lib/db";

export default async function create(req, res) {
  const { sighting: sightingData } = req.body;
  const newSighting = await createMonkeySighting(sightingData);
  res.status(200).json(newSighting);
}

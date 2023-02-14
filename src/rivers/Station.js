import { 
  useLoaderData,
} from "react-router-dom";
import {
  getStation,
} from "../services/EAService";

export async function loader({ params }) {
  const station = await getStation(params.stationid);
  if (!station) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return station;
}

export default function Station() {
  const station = useLoaderData();

  return (
    <>
      <h2>{station.label}</h2>
      <div>{station.riverName}</div>
      <div>{station.catchmentName}</div>
      <div>{station.eaAreaName}</div>
      <div>{station.eaRegionName}</div>
      <div>{station.town}</div>
    </>
  );
}

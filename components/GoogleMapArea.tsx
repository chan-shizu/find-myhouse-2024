import { Position } from "@/app/page";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { FC, useState } from "react";
import "./googleMap.css";
import { useRouter } from "next/navigation";

type Props = { currentTime?: number };
export type Position = { lat: number; lng: number };

const containerStyle = {
  width: "100%",
  height: "100%",
};
const myHomePosition = {
  lat: 35.61283,
  lng: 139.52616,
};
const EARTH_RAD = 6378.137; // km
const deg2rad = (deg: number) => {
  return (deg * Math.PI) / 180.0;
};
const calcDistance = (tappedPosition: Position) => {
  const tappedPositionLat = deg2rad(tappedPosition.lat);
  const tappedPositionLng = deg2rad(tappedPosition.lng);
  const myHomePositionLat = deg2rad(myHomePosition.lat);
  const myHomePositionLng = deg2rad(myHomePosition.lng);
  return (
    EARTH_RAD *
    Math.acos(
      Math.sin(tappedPositionLat) * Math.sin(myHomePositionLat) +
        Math.cos(tappedPositionLat) * Math.cos(myHomePositionLat) * Math.cos(tappedPositionLng - myHomePositionLng)
    )
  );
};

export const GoogleMapArea: FC<Props> = ({ currentTime }) => {
  const [tappedPositions, setTappedPositions] = useState<Position[]>([]);
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const router = useRouter();

  const infoWindowOptions = {
    pixelOffset: size,
    minWidth: 80,
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapApiKey!,
  });

  if (tappedPositions.length > 0 && calcDistance(tappedPositions[tappedPositions.length - 1]) < 0.3) {
    if (!currentTime) return;
    localStorage.setItem("clear_time", currentTime.toFixed(1));
    router.push("/ranking");
  }

  if (!isLoaded) return null;

  const onClickMap = (tapData: google.maps.MapMouseEvent) => {
    const lat = tapData.latLng?.lat();
    const lng = tapData.latLng?.lng();
    if (!lat || !lng) return;

    setTappedPositions((prev) => [...prev, { lat: lat, lng: lng }]);
  };

  const divStyle = {
    background: "white",
    fontSize: 15,
  };

  return (
    <GoogleMap
      key="google-map"
      mapContainerStyle={containerStyle}
      center={
        tappedPositions.length === 0
          ? {
              lat: 43.2203,
              lng: 142.8365,
            }
          : tappedPositions[tappedPositions.length - 1]
      }
      zoom={10}
      onClick={onClickMap}
      onLoad={() => createOffsetSize()}
    >
      {tappedPositions.map((position, index) => (
        <div key={`${index}`}>
          <Marker key={`${index}-marker`} position={position}></Marker>
          <InfoWindow key={`${index}-info-windows`} position={position} options={infoWindowOptions}>
            <div style={divStyle}>
              <p>{calcDistance(position).toFixed(1)}km</p>
            </div>
          </InfoWindow>
        </div>
      ))}
    </GoogleMap>
  );
};

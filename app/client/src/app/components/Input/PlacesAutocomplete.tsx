import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import TextInput from "./TextField";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GooglePlaceInputProps {
  label?: string;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

const PlacesAutocomplete: React.FC<GooglePlaceInputProps> = ({
  label = "Location",
  onLocationSelect,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_PLACES_API as string,
    libraries: ["places"],
  });
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: {
      // Specify additional options like bounds or types if needed
      // componentRestrictions: { country: "us" },
    // },
    debounce: 300,
  });

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onLocationSelect(lat, lng, address);
      setError(null);
    } catch (error) {
      console.error("Error fetching location details: ", error);
      setError("Failed to get location details. Please try again.");
    }
  };

  if (loadError) return <div>Error loading Google Maps script</div>;
  if (!isLoaded) return <div>Loading Component...</div>
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <TextInput
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder="Enter a location"
              disabled={!ready}
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full max-w-md">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <DropdownMenuItem
                key={place_id}
                onClick={() => handleSelect(description)}>
                {description}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PlacesAutocomplete;

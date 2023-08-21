import { useEffect } from "react";
import api from "../infra/services/api";

// interface Location {
//   lat: number;
//   long: number;
//   timestamp: number;
// }

function getLocation(lat: number, lng: number) {
  const latlng = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      const location = getAddressComponents(results);
      console.log(location);
      location.lat = lat;
      location.long = lng;
      location.timestamp = new Date().getTime();
      api.post("/location", location, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  });
}

const useLocation = (isLoaded: boolean) => {
  const geo = navigator.geolocation;

  useEffect(() => {
    if (isLoaded) {
      geo.getCurrentPosition(
        (a) => {
          console.log(a.coords.latitude, a.coords.longitude);
          getLocation(a.coords.latitude, a.coords.longitude);
        },
        () => {
          console.log("error");
        },
        { enableHighAccuracy: true }
      );
    }
  }, [isLoaded]);
};

function getAddressComponents(results) {
  const location = {
    country: "",
    state: "",
    city: "",
  };
  for (let i = 0; i < results[0].address_components.length; i++) {
    const shortname = results[0].address_components[i].short_name;
    const longname = results[0].address_components[i].long_name;
    const type = results[0].address_components[i].types;
    if (type.indexOf("country") != -1 && location.country == "") {
      if (!isNullOrWhitespace(longname)) {
        location.country = longname;
      } else {
        return (location.country = shortname);
      }
    }
    if (
      type.indexOf("administrative_area_level_1") != -1 &&
      location.state == ""
    ) {
      if (!isNullOrWhitespace(longname)) {
        location.state = longname;
      } else {
        location.state = shortname;
      }
    }
    if (
      type.indexOf("locality") != -1 ||
      (type.indexOf("administrative_area_level_2") != -1 && location.city == "")
    ) {
      if (!isNullOrWhitespace(longname)) {
        location.city = longname;
      } else {
        location.city = shortname;
      }
    }
  }

  return location;
}

function isNullOrWhitespace(text) {
  if (text == null) {
    return true;
  }
  return text.replace(/\s/gi, "").length < 1;
}

export default useLocation;

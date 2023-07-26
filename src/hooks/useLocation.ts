import { useEffect, useState } from "react"
import codegrid from "codegrid-js"

interface Location {
    lat: number;
    long: number;
    timestamp: number;
}
function getLocation(lat: number, lng: number) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(getCountry(results))
        }
    });
}

const useLocation = (isLoaded: boolean) => {
    const geo = navigator.geolocation;

    useEffect(() => {
        if (isLoaded) {
            geo.getCurrentPosition((a) => {
                getLocation(a.coords.latitude, a.coords.longitude)
            });
        }

    }, [isLoaded]);

}


function getCountry(results) {
    for (var i = 0; i < results[0].address_components.length; i++) {
        var shortname = results[0].address_components[i].short_name;
        var longname = results[0].address_components[i].long_name;
        var type = results[0].address_components[i].types;
        if (type.indexOf("country") != -1) {
            if (!isNullOrWhitespace(shortname)) {
                return shortname;
            }
            else {
                return longname;
            }
        }
    }

}

function isNullOrWhitespace(text) {
    if (text == null) {
        return true;
    }
    return text.replace(/\s/gi, '').length < 1;
}

export default useLocation;
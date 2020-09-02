var address;
var maprecce;
var mapTransit;
var directionsDisplay;
var directionsRenderer
var directionsService = new google.maps.DirectionsService();
var bounds = new google.maps.LatLngBounds();
var FTC = "../images/map%20Icons/FTC.png"
var ATC = "../images/map%20Icons/ATC.png"
var flag = "http://maps.google.com/mapfiles/ms/icons/flag.png"
var rallyHQ = "http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png"
var redPoint = "http://maps.google.com/mapfiles/ms/icons/red.png"
var greenPoint = "http://maps.google.com/mapfiles/ms/icons/green.png"
var blueDot = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
var service = "http://maps.google.com/mapfiles/ms/icons/mechanic.png"
var infoWindows = [];
var markers = [];
var markerObj = {};

function renderDirectionsRecce(map, result) {
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(maprecce);
    directionsRenderer.setOptions({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
            strokeColor: "red"
        }
    });
    directionsRenderer.setDirections(result);
}


function renderDirections(map, result) {
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapTransit);
    directionsRenderer.setOptions({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
            strokeColor: "red"
        }
    });
    directionsRenderer.setDirections(result);

}

function calcRouteRECCE(map, latStart, lonStart, latend, lonend) {
    var start = new google.maps.LatLng(latStart, lonStart);
    var end = new google.maps.LatLng(latend, lonend);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            renderDirectionsRecce(maprecce, response);
        } else {
        }
    });
}

function calcRoute(map, latStart, lonStart, latend, lonend) {
    var start = new google.maps.LatLng(latStart, lonStart);
    var end = new google.maps.LatLng(latend, lonend);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            renderDirections(mapTransit, response);
        } else {
        }
    });
}

function initializeRecceMap(divID) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapProp = {
        center: new google.maps.LatLng(37, -91),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    maprecce = new google.maps.Map(document.getElementById(divID), mapProp);
}

function initialize(divID) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapProp = {
        center: new google.maps.LatLng(37, -91),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapTransit = new google.maps.Map(document.getElementById(divID), mapProp);
}

function startgeoCode(address) {
    var resultData
    var promise = geoCode(address);
    promise.then(function(result) {
        resultData = result.results[0].geometry.location
        var itemInfo = "Rally HQ"
        addItemsMap(itemInfo, 'rallyHQ', mapTransit, resultData.lat, resultData.lng, 'rallyHQ', 1)
        var pt = new google.maps.LatLng(resultData.lat, resultData.lng);
        mapTransit.setCenter(pt)
        mapTransit.setZoom(15);
    });
}

function convertgeoGPS(coordinate) {
    try {
        var coordinateClean = coordinate.split(" ")
        var dir = coordinateClean[0]
        var degrees = parseFloat(coordinateClean[1])
        var min = parseFloat(coordinateClean[2])
        var coordinateCOnverted = min / 60 + degrees
        if (dir === 'W') {
            coordinateCOnverted = -Math.abs(coordinateCOnverted)
        }
        return coordinateCOnverted
    } catch (err) {
        return coordinate
    }
}

function geoCode(address) {
    var deferred = $.Deferred();
    var resultData
    var nextStep = function(address) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCEbcMGtR9BHNcHmEfeb8SXYR-V-g11nMY', function(data) {
            this.lon = data.results[0].geometry.location.lng
            this.lat = data.results[0].geometry.location.lat
            resultData = data
            deferred.resolve(resultData);
        })
    }
    nextStep(address);
    return deferred.promise();
}

function addItemsMap(itemInfo, itemID, map, lat, lon, iconType, cleaned) {
    var pos
    var iconPNG = "";
    if (cleaned != 1) {
        var Lat = convertgeoGPS(lat)
        var Lon = convertgeoGPS(lon)
        pos = {
            lng: Lon,
            lat: Lat
        }
    } else {
        pos = {
            lng: lon,
            lat: lat
        }
    }
    switch (iconType) {
        case "flag":
            iconPNG = flag
            break;
        case "redPoint":
            iconPNG = redPoint
            break;
        case "rallyHQ":
            iconPNG = rallyHQ
            break;
        case "FTC":
            iconPNG = FTC
            break;
        case "ATC":
            iconPNG = ATC
            break;
        case "blueDot":
            iconPNG = blueDot
            break;
    }
    var marker = new google.maps.Marker({
        position: pos,
        map: mapTransit,
        icon: iconPNG,
        info: itemInfo,
        id: itemID
    });
    bounds.extend(marker.position);
    markerObj[itemID] = marker
    markers.push(marker)
    iconPNG = "";
    google.maps.event.addListener(marker, 'click', function() {
        for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
        }
        infowindow = new google.maps.InfoWindow();
        infoWindows.push(infowindow);
        infowindow.setContent(this.info);
        infowindow.open(mapTransit, this);
    });
    mapTransit.fitBounds(bounds);
}


function addItemsMapRecce(itemInfo, itemID, map, lat, lon, iconType, cleaned) {
    var pos
    var iconPNG = "";
    if (cleaned != 1) {
        var Lat = convertgeoGPS(lat)
        var Lon = convertgeoGPS(lon)
        pos = {
            lng: Lon,
            lat: Lat
        }
    } else {
        pos = {
            lng: lon,
            lat: lat
        }
    }
    switch (iconType) {
        case "flag":
            iconPNG = flag
            break;
        case "redPoint":
            iconPNG = redPoint
            break;
        case "rallyHQ":
            iconPNG = rallyHQ
            break;
        case "FTC":
            iconPNG = FTC
            break;
        case "ATC":
            iconPNG = ATC
            break;
        case "blueDot":
            iconPNG = blueDot
            break;
    }
    var marker = new google.maps.Marker({
        position: pos,
        map: maprecce,
        icon: iconPNG,
        info: itemInfo,
        id: itemID
    });
    bounds.extend(marker.position);
    markerObj[itemID] = marker
    markers.push(marker)
    iconPNG = "";
    google.maps.event.addListener(marker, 'click', function() {
        for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
        }
        infowindow = new google.maps.InfoWindow();
        infoWindows.push(infowindow);
        infowindow.setContent(this.info);
        infowindow.open(maprecce, this);
    });
    maprecce.fitBounds(bounds);
}

function clearOutMap() {
    while (markers.length) {
        markers.pop().setMap(null);
    }
    markers.length = 0;
}
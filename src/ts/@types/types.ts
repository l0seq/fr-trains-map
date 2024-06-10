export enum terFormat {
    stopId,
    stopName,
    stopDesc,
    stopLat,
    stopLon,
    zoneId,
    stopUrl,
    locationType,
    parentStation,
}

export enum terRouteFormat {
    routeId,
    agencyId,
    routeShortName,
    routeLongName,
    routeDesc,
    routeType,
    routeUrl,
    routeColor,
    routeTextColor

}

export enum terTripsFormat {
    routeId, serviceId, tripId, tripHeadsign, directionId, blockId, shapeId
}

export enum terStopTimeFormat {
    tripId, arrivalTime, departureTime, stopId, stopSequence, stopHeadsign, pickupType, dropOffType, shapeDistTraveled
}
export interface geoJsonObject {
    geometry: {
        coordinates: number[],
        type: "Point"
    },
    properties: {
        id: string,
        name: string,
        parent_station?: string,
        stop_points?: Array<string | null>,
        wheelchair_boarding?: string
    },
    type: "Feature"
}
export interface geoJsonLineObject {
    geometry: {
        coordinates: Array<number[]>,
        type: "LineString"
    },
    properties: {
        id: string,
        name: string
    },
    type: "Feature"
}

export interface routeObject {
    routeId: string,
    routeShortId: string,
    routeLongId: string,
    routeColor: string,
    routeStops: Array<string | null>
}

export interface tripObject {
    routeId: string,
    tripId: string,
    directionId: string
}
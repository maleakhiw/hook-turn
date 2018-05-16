export class Departure {
    stop_id: number;
    route_id: number;
    run_id: number;
    direction_id: number;
    disruption_ids: any[];
    scheduled_departure_utc: String;
    estimated_departure_utc: String;
    at_platform: boolean;
    platform_number: any;
    flags: string;
}

export class Stop {
  stop_distance: number;
  stop_name: string;
  stop_id: number;
  route_type: number;
  stop_latitude: number;
  stop_longitude: number;
}

export class DeparturesData {
    status: string;
    stopID: string;
    ptvData: any; // TODO needed for bot, but redundant info
    groupedDepts: any;
    crowdSourcedDisruptions: any[];
    routeGuide?: any;
}

export interface Station {
    id: number;
    city: string;
}

export interface StationActionProps {
    stationId: number;
    onDelete: (stationId: number) => void;
}

export interface StationFormData {
    city: string;
}
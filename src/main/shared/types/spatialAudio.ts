import { Vector3 } from "alt-shared";

export interface SpatialAudioOptions {
    uid: string;
    position: Vector3;
    distance?: number;
    volume: number;
    isLooped?: boolean;
}
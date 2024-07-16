import { VehicleIndicatorLights } from 'alt-client';
import { Vector3 } from 'alt-shared';

type StreetData = {
    crossingRoad: string;
    streetName: string;
};

export type PlayerStats = {
    ammo: number;
    armour: number;
    direction: string;
    engineOn: boolean;
    fps: number;
    gear: number;
    health: number;
    indicatorLights: VehicleIndicatorLights;
    inVehicle: boolean;
    inWater: boolean;
    isAiming: boolean;
    isFlying: boolean;
    isMetric: boolean;
    isTalking: boolean;
    lights: [boolean, boolean];
    locked: boolean;
    maxGear: number;
    ping: number;
    seat: number;
    speed: number;
    stamina: number;
    street: StreetData;
    time: { hour: number; minute: number; second: number };
    vehicleClass: number;
    vehicleHealth: number;
    weapon: number;
    weather: string;
    zone: string;
    pos: Vector3;
    rot: Vector3;
};

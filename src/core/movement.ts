/**
 * Locatable interface
 * 
 * Applying this interface to a class allows it to be located in space.
 */
export interface Locatable {
    location: Location;
}

/**
 * Moveable interface
 * 
 * Applying this interface to a class allows it to be moved in space.
 * It can be used to define the heading and pitch of the object.
 * The move method allows the object to move a certain distance in a specified direction.
 * The moveToward method allows the object to move toward another object.
 */
export interface Moveable {
    moveToward(target: Locatable, distance: number): void;
    distanceTo(target: Locatable): number;
}

export interface LocationInterface {
    x: number;
    y: number;
    z: number;

    distanceTo(other: LocationInterface): number;
    moveToward(target: LocationInterface, distance: number, stopAtArrival?: boolean): LocationInterface;
}

/**
 * Location class
 * 
 * Represents a 2D or 3D location in space.
 * It can be used to calculate distances, bearings, and pitches between locations.
 */
export class Location {
    x: number;
    y: number;
    z: number = 0;

    constructor(x: number, y: number, z?: number) {
        this.x = x;
        this.y = y;
        if (z !== undefined) this.z = z;
    }

    /**
     * Calculates the distance to another location.
     * 
     * @param other - The other location to calculate the distance to
     * @returns The distance in generic units
     */
    distanceTo(other: Location): number {
        return Math.sqrt(
            Math.pow(other.x - this.x, 2) +
            Math.pow(other.y - this.y, 2) +
            Math.pow(other.z - this.z, 2)
        );
    }

    /**
     * Move this location toward another location by a specified distance.
     * 
     * @param target - The target location to move toward
     * @param distance - The distance to move
     * @param stopAtArrival - Whether to stop at the target location if the distance is greater than the total distance
     * @returns A new Location object representing the new position
     */
    moveToward(target: Location, distance: number, stopAtArrival: boolean = true): Location {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dz = target.z - this.z;
        const totalDistance = this.distanceTo(target);
        if (totalDistance === 0) return this;
        if (stopAtArrival && distance >= totalDistance) return new Location(target.x, target.y, target.z);
        const ratio = distance / totalDistance;
        return new Location(
            this.x + dx * ratio,
            this.y + dy * ratio,
            this.z + dz * ratio
        );
    }
}
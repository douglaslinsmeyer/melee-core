/**
 * Locatable interface
 * 
 * Applying this interface to a class allows it to be located in space.
 */
export interface Locatable {
    location: LocationInterface;
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
}

export interface LocationInterface {
    position: PointInterface;
    direction: VectorInterface;
    distanceTo(other: LocationInterface): number;
    moveToward(target: LocationInterface, distance: number, stopAtArrival?: boolean): LocationInterface;
}

export class Battlespace {

    limit: PointInterface;

    constructor(limit: PointInterface) {
        this.limit = limit;
    }
}

export interface PointInterface {
    x: number;
    y: number;
    z: number;
}

export interface VectorInterface extends PointInterface {
    speed: number;
}

/**
 * Location class
 * 
 * Represents a 2D or 3D location in space.
 * It can be used to calculate distances, bearings, and pitches between locations.
 */
export class Location implements LocationInterface {
    private _position: PointInterface;
    private _direction: VectorInterface;

    constructor(position?: PointInterface, direction?: VectorInterface) {
        this._position = (position) ? position : { x: 0, y: 0, z: 0 };
        this._direction = (direction) ? direction : { x: 0, y: 0, z: 0, speed: 0 };
    }

    public get position() {
        return this._position;
    }

    public set position(point: PointInterface) {
        this._position = point;
    }

    public get direction() {
        return this._direction;
    }

    public set direction(vector: VectorInterface) {
        this._direction = vector;
    }

    /**
     * Calculates the distance to another location.
     * 
     * @param other - The other location to calculate the distance to
     * @returns The distance in generic units
     */
    distanceTo(other: Location): number {
        return Math.sqrt(
            Math.pow(other.position.x - this.position.x, 2) +
            Math.pow(other.position.y - this.position.y, 2) +
            Math.pow(other.position.z - this.position.z, 2)
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
    moveToward(target: Location, distance: number, stopAtArrival: boolean = true): LocationInterface {
        const dx = target.position.x - this.position.x;
        const dy = target.position.y - this.position.y;
        const dz = target.position.z - this.position.z;
        const totalDistance = this.distanceTo(target);
        if (totalDistance === 0) return this;
        if (stopAtArrival && distance >= totalDistance) return new Location(
            {
                x: target.position.x, 
                y: target.position.y, 
                z: target.position.z
            },
            { x: 0, y: 0, z: 0, speed: 0 }
        );
        const ratio = distance / totalDistance;
        return new Location(
            {
                x: this.position.x + dx * ratio,
                y: this.position.y + dy * ratio,
                z: this.position.z + dz * ratio
            }, 
            { x: 0, y: 0, z: 0, speed: 0 }
        );
    }
}
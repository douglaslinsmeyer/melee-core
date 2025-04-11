import { Location } from "../src/movements/movement";

function createLocation(x: number, y: number, z: number): Location {
    return new Location({ x, y, z });
}

describe('Game Test', () => {
    test('Test 1-Dimensional distance calculation.', () => {
        const locationA = createLocation(0, 0, 0);
        const locationB = createLocation(1, 0, 0);
        const locationC = createLocation(0, 1, 0);
        const locationD = createLocation(0, 0, 1);
        expect(locationA.distanceTo(locationB)).toBe(1);
        expect(locationA.distanceTo(locationC)).toBe(1);
        expect(locationA.distanceTo(locationD)).toBe(1);
    });

    test('Test 2-Dimensional distance calculation.', () => {
        const locationA = createLocation(0, 0, 0);
        const locationB = createLocation(1, 1, 0);
        const locationC = createLocation(0, 1, 1);
        const locationD = createLocation(1, 0, 1);
        expect(locationA.distanceTo(locationB)).toBe(Math.sqrt(2));
        expect(locationA.distanceTo(locationC)).toBe(Math.sqrt(2));
        expect(locationA.distanceTo(locationD)).toBe(Math.sqrt(2));
    });

    test('Test 3-Dimensional distance calculation.', () => {
        const locationA = createLocation(0, 0, 0);
        const locationB = createLocation(1, 1, 1);
        expect(locationA.distanceTo(locationB)).toBe(Math.sqrt(3));
    });

    test('Test movement toward another location.', () => {
        const locationA = createLocation(0, 0, 0);
        const locationB = createLocation(1, 1, 1);
        const movedLocation = locationA.moveToward(locationB, locationA.distanceTo(locationB));
        expect (movedLocation.position.x).toBe(1);
        expect (movedLocation.position.y).toBe(1);
        expect (movedLocation.position.z).toBe(1);
        const movedLocation2 = locationA.moveToward(locationB, locationA.distanceTo(locationB) / 2);
        expect (movedLocation2.position.x).toBe(0.5);
        expect (movedLocation2.position.y).toBe(0.5);
        expect (movedLocation2.position.z).toBe(0.5);
        const movedLocation3 = locationA.moveToward(locationB, locationA.distanceTo(locationB) * -1);
        expect (movedLocation3.position.x).toBe(-1);
        expect (movedLocation3.position.y).toBe(-1);
        expect (movedLocation3.position.z).toBe(-1);
        const movedLocation4 = locationA.moveToward(locationB, 100);
        expect(movedLocation4.position.x).toBe(1);
        expect(movedLocation4.position.y).toBe(1);
        expect(movedLocation4.position.z).toBe(1);
        const movedLocation5 = locationA.moveToward(locationB, 100, false);
        expect(movedLocation5.position.x).not.toBe(1);
        expect(movedLocation5.position.y).not.toBe(1);
        expect(movedLocation5.position.z).not.toBe(1);
    });
});
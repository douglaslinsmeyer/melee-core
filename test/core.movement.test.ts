import { Location } from "../src/movement";

describe('Game Test', () => {
    test('Test 1-Dimensional distance calculation.', () => {
        const locationA = new Location(0, 0, 0);
        const locationB = new Location(1, 0, 0);
        const locationC = new Location(0, 1, 0);
        const locationD = new Location(0, 0, 1);
        expect(locationA.distanceTo(locationB)).toBe(1);
        expect(locationA.distanceTo(locationC)).toBe(1);
        expect(locationA.distanceTo(locationD)).toBe(1);
    });

    test('Test 2-Dimensional distance calculation.', () => {
        const locationA = new Location(0, 0, 0);
        const locationB = new Location(1, 1, 0);
        const locationC = new Location(0, 1, 1);
        const locationD = new Location(1, 0, 1);
        expect(locationA.distanceTo(locationB)).toBe(Math.sqrt(2));
        expect(locationA.distanceTo(locationC)).toBe(Math.sqrt(2));
        expect(locationA.distanceTo(locationD)).toBe(Math.sqrt(2));
    });

    test('Test 3-Dimensional distance calculation.', () => {
        const locationA = new Location(0, 0, 0);
        const locationB = new Location(1, 1, 1);
        expect(locationA.distanceTo(locationB)).toBe(Math.sqrt(3));
    });

    test('Test movement toward another location.', () => {
        const locationA = new Location(0, 0, 0);
        const locationB = new Location(1, 1, 1);
        const movedLocation = locationA.moveToward(locationB, locationA.distanceTo(locationB));
        expect (movedLocation.x).toBe(1);
        expect (movedLocation.y).toBe(1);
        expect (movedLocation.z).toBe(1);
        const movedLocation2 = locationA.moveToward(locationB, locationA.distanceTo(locationB) / 2);
        expect (movedLocation2.x).toBe(0.5);
        expect (movedLocation2.y).toBe(0.5);
        expect (movedLocation2.z).toBe(0.5);
        const movedLocation3 = locationA.moveToward(locationB, locationA.distanceTo(locationB) * -1);
        expect (movedLocation3.x).toBe(-1);
        expect (movedLocation3.y).toBe(-1);
        expect (movedLocation3.z).toBe(-1);
        const movedLocation4 = locationA.moveToward(locationB, 100);
        expect(movedLocation4.x).toBe(1);
        expect(movedLocation4.y).toBe(1);
        expect(movedLocation4.z).toBe(1);
        const movedLocation5 = locationA.moveToward(locationB, 100, false);
        expect(movedLocation5.x).not.toBe(1);
        expect(movedLocation5.y).not.toBe(1);
        expect(movedLocation5.z).not.toBe(1);
    });
});
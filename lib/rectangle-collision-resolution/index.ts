import Point from "../2d/Point";
import Rectangle from "../2d/Rectangle";
import Ray from "../2d/Ray";
import Vector from "../2d/Vector";
import DynamicRectangle from "../2d/DynamicRectangle";

// This will only work for axis aligned rectangles aka not rotated rectangles

// Returns true if point lies within rectangle
export function PointVsRect(p: Point, r: Rectangle): boolean {
    return (p.x >= r.position.x && p.y >= r.position.y && p.x < r.position.x + r.width && p.y < r.position.y + r.height);
}

// https://youtu.be/8JJ-4JgR7Dg?t=387 Note this will not be enough to resolve collisions
export function RectVsRectangle(r1: Rectangle, r2: Rectangle) {
    return (r1.position.x < r2.position.x + r2.width && r1.position.x + r1.width > r2.position.x && r1.position.y < r2.position.y + r2.height && r1.position.y + r1.height > r2.position.y);
}

// Projected rectangle collision method https://youtu.be/8JJ-4JgR7Dg?t=981

/*
   Near time on the x axis is always less than the far time on the y axis
   Near time on the y axis is always less than far time on the x axis
   Otherwise there is no intersection between the ray and the rectangle
   It is important, however to sort near and far in their respective axis before doing this check
   Also it is possible to never cross in one of the axis which will result in the positive and negative infinity results
 */
function getNearCollisionTime(ray: Ray, rectangle: Rectangle, axis: "x" | "y"): number {
    return (rectangle.position[axis] - ray.start[axis]) / ray.direction[axis];
}

function getFarCollisionTime(ray: Ray, rectangle: Rectangle, axis: "x" | "y"): number {
    return (rectangle.position[axis] + rectangle.width - ray.start[axis]) / ray.direction[axis]
}

interface CollisionInfo {
    collision: boolean
    contactNormal?: Vector
    contactPoint?: Point
    t?: number
}

export function RayVsRect(oray: Ray, rectangle: Rectangle): CollisionInfo {
    let ray = oray.clone();

    const tNear = {
        x: getNearCollisionTime(ray, rectangle,"x"),
        y: getNearCollisionTime(ray, rectangle,"y")
    };
    const tFar = {
        x: getFarCollisionTime(ray, rectangle,"x"),
        y: getFarCollisionTime(ray, rectangle,"y")
    };

    if (isNaN(tFar.y) || isNaN(tFar.x)) return { collision: false };
    if (isNaN(tNear.y) || isNaN(tNear.x)) return { collision: false };

    if (tNear.x > tFar.x) {
        const temp = tNear.x;
        tNear.x = tFar.x;
        tFar.x = temp;
    }

    if (tNear.y > tFar.y) {
        const temp = tNear.y;
        tNear.y = tFar.y;
        tFar.y = temp;
    }

    if (tNear.x > tFar.y || tNear.y > tFar.x) return { collision: false };

    const tHitNear = Math.max(tNear.x , tNear.y);
    const tHitFar = Math.min(tFar.x, tFar.y);

    // If the collision has happened behind the ray direction aka the far hit point is negative we will reject it
    if (tHitFar < 0) return { collision: false };

    const contactPoint = ray.getPointAlongRay(tHitNear);
    let contactNormal: Vector | undefined;

    if (tNear.x > tNear.y) {
        if (ray.direction.x < 0) {
            contactNormal = new Vector(1, 0)
        } else {
            contactNormal = new Vector(-1, 0);
        }
    } else if (tNear.x < tNear.y) {
        if (ray.direction.y < 0) {
            contactNormal = new Vector(0 ,1)
        } else {
            contactNormal = new Vector(0, -1)
        }
    }

    return { collision: true, contactNormal: contactNormal, contactPoint, t: tHitNear }
}

export function DynamicRectangleVsRectangle(input: DynamicRectangle, target: Rectangle, elapsedTime: number): CollisionInfo {
    if (input.velocity.magnitude() == 0) {
        return { collision: false };
    }

    const halfSize = new Vector(input.width, input.height).divideByScalar(2);
    const expandedPosition = target.position.clone().subtract(halfSize);
    const expandedTarget = new Rectangle(
        expandedPosition.x,
        expandedPosition.y,
        input.width + target.width,
        input.height + target.height
    );

    const sourceRay = new Ray(input.center(), input.velocity.clone().multiplyByScalar(elapsedTime));
    const collisionInfo = RayVsRect(sourceRay, expandedTarget);
    if (collisionInfo.collision) {
        if (collisionInfo.t && collisionInfo.t <= 1) {
            return collisionInfo
        }
    }

    return { collision: false }
}

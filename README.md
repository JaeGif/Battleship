This is a rendition of the classic Battleship game by Hasbro. In this version you can play locally human v human OR vs an AI CPU of 2 difficulties, Easy and Normal

Easy AI: picks random coordinates no matter what
Normal AI: tries positions adjacent if it lands a hit, and if there are 2 hits, continues attacking in a line until a miss is registered.

Human v Human: General Loop:

player 1 places their ships, the board then changes for player 2 to place their ships.
Take turns attacking alternating the gameboard so the opponeent cannot see th location of their opponeents ships.

Display idea:
Display current players small and in the corner. Display the opponents (hidden) board larger and center frame.

Learned:
Aspect Ratio CSS Rule

Learned!!!!
17

To sum it all up, and for clarification, there's three ways of copying a JS object.

A normal copy. When you change the original object's properties, the copied object's properties will change too (and vice versa).
const a = { x: 0}
const b = a;
b.x = 1; // also updates a.x
A shallow copy. Top level properties will be unique for the original and the copied object. Nested properties will be shared across both objects though. Use the spread operator ...{} or Object.assign().
const a = { x: 0, y: { z: 0 } };
const b = {...a}; // or const b = Object.assign({}, a);

b.x = 1; // doesn't update a.x
b.y.z = 1; // also updates a.y.z
A deep copy. All properties are unique for the original and the copies object, even nested properties. For a deep copy, serialize the object to JSON and parse it back to a JS object.
const a = { x: 0, y: { z: 0 } };
const b = JSON.parse(JSON.stringify(a));

b.y.z = 1; // doesn't update a.y.z
Using Object.create() does create a new object. The properties are shared between objects (changing one also changes the other). The difference with a normal copy, is that properties are added under the new object's prototype **proto**. When you never change the original object, this could also work as a shallow copy, but I would suggest using one of the methods above, unless you specifically need this behaviour.
Share
Edit
Follow
edited Nov 17, 2021 at 8:46

ToDo List

1. Victory Screen needs playername Assignments. QOL update, change "You sunk the ..." to playerName sunk the ....

1. CpuAttack Patterns needs work. Smart attack works well and discards a target after the possibilities have been exhausted and removes the target when the ship is sunk.

cpuKillMove does not correctly target in a dx/dy position based on a 2 hit line, I need to workshop how to properly decide when the hits have been exhausted. This is the desired behavior:

    mock board
    0    0    next 0    0
    0    0    hit  0    0
    0    0    hit  0    0
    0    0    next 0    0
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0


    mock board
    0    0    0    0    0
    0    0    0    0    0
    hit next hit  next  0
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0


        mock board
    0    0    0    0    0
    0    0    0    0    0
    hit next next  hit next
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0

Where next is a randomly selected possible attack.

Currenty issue is that on a hit, the GameState.lastHit array updates, which may make it possible for a line's possibilities to not be exhausted before the systemruns out of targets.

The idea is that if there is a clear line drawn, the system will target until there is a miss on either side of the line (indicating the ships reside in the opposite axis at which point cpuSmartAttack fn takes over again, until a new line is drawn) OR until the ship is sunk.

ex.

        mock board
    0    0    0    0    0    0
    0    0    0    0    0    0
    0    0    0    0    0    0
    0    0   ship2 0    0    0
    0  ship1 ship2 0    0    0
    0  ship1 ship2 0    0    0
    0  ship1 ship2 0    0    0
    0    0    0    0    0    0
    0    0    0    0    0    0

miss on both sides causes it to reevaluate its next target, and pick one of the hits to target around again.

        mock board
    0    0    0    0    0    0
    0    0    0    0    0    0
    0    0    0    0    0    0
    0    0   ship2 0    0    0
    0  ship1 ship2 0    0    0
    miss hit  hit  miss  0    0
    0  ship1 ship2 0    0    0
    0    0    0    0    0    0
    0    0    0    0    0    0

2. Check all references to Gqmestate arrays for the weird reassignment bug use [...ajehg] instead!

3. Add a charge counter to playerState Object to be used for making big attacks.
4. add special attacks.

- Air strike, 9 energy, mows down an entire line.
- Radar, 4 energy, shows the number of nearby occupied squares in the immediate radius
- Bomb - 5 energy, blows up a 2x2 square radius
- Sniper - 5 energy, strikes any 1 random occupied enemy position
- RtS Shield (Return to Sender) - 4 energy, the next attack from the enemy is reflected to strike the same position on the attackers board. If that position is occupied, attack a random position on the attackers board.

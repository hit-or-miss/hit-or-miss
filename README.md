THE GAME WHERE YOU GET TO LEAD YOUR SHIPS TO VICTORY!
```txt
        ╔════════════════════════════════════════════════════╗
        ║  ##     ## #### ########       #######  ########   ║
        ║  ##     ##  ##     ##         ##     ## ##     ##  ║
        ║  ##     ##  ##     ##         ##     ## ##     ##  ║
        ║  #########  ##     ##         ##     ## ########   ║
        ║  ##     ##  ##     ##         ##     ## ##   ##    ║
        ║  ##     ##  ##     ##         ##     ## ##    ##   ║
        ║  ##     ## ####    ##          #######  ##     ##  ║
        ║                                                    ║
        ║      ##     ## ####  ######   ######    ####       ║
        ║      ###   ###  ##  ##    ## ##    ##   ####       ║
        ║      #### ####  ##  ##       ##         ####       ║
        ║      ## ### ##  ##   ######   ######     ##        ║
        ║      ##     ##  ##        ##       ##              ║
        ║      ##     ##  ##  ##    ## ##    ##   ####       ║
        ║      ##     ## ####  ######   ######    ####       ║
        ╚════════════════════════════════════════════════════╝
```
**Version**: 1.0.0

**Creators**: Team !ASYNC - Katherine Smith, George McCadden III, Emery Parks, Ryan Milton, David Chambers

## System Requirements
### Local Server Installation
To install this package on your local system:
1. Clone/Fork the repository into your local system
2. Run ```npm i``` in the directory of the repository to install the required directories.
3. Local installations will also require a local MongoDB installation.  See [app-details.md](./docs/app-details.md) located in the `docs` folder for more information.
4. Start your MongoDB server
5. Run ```npm run start``` to start the game server.

**NOTE:** *The default server address for a local installation is localhost:3000.*

### URL Access
If you do not want to install locally, the game server is also deployed live at `www.hitormiss.fun` and includes the necessary MongoDB server.  **NOTE**: *The examples in the game documentation and help files will use the URL as the server location*.

### Comand Line Interface (CLI)
***Hit or Miss!*** is played via the command line using the HTTP methods of GET and POST. The following HTTP command line clients have been tested successfully:

* HTTPie: `https://httpie.org/` - use with basic authorization (username:password). *NOTE:*  *The examples used in the game documentation and help files will use HTTPie to communicate with the game server.*

* Postman: `https://www.getpostman.com/` - can use either basic (username:password) or Bearer Authorization (a token is provided at sign up).

### Additional System/Development Information
Full details about the server and the "behind the scenes" details of ***Hit or Miss!*** can be found in [app-details.md](./docs/app-details.md) located in the `docs` directory.

# Playing The Game
### Overview
Codefellowia is under attack and your naval armada is the only thing standing between success and mid-term project failure.

**Your mission:** Destroy the advancing enemy fleet before they destroy you!

### User Account
Each player must have a registered account.  NEW USERS can register by running `http POST www.hitormiss.fun/signup username=<username> password=<password>`

After a successful sign up, the server will return a welcome screen and the user's bearer authorization token.  The user should save the token in a save place to be used with CLIs that allow bearer authorization sign-in options.

### Starting A Game
To begin playing, the user should enter `http -a <username>:<password> GET www.hotormiss.fun/setup` in the CLI.  This will initialize a computer opponent and instruct the user to place their ships on the users primary board.

All of the CLI commands DURING the game will begin with `http -a <username>:<password>` followed by the desired command.

### Placing Ships on the Board
*You may recall these instructions using `GET www.hitormiss.fun/setuphelp` at any time during setup.*

**Your armada includes the following ships:**

Type of Ship - Armor
 * (A)ircraft Carrier - 5
 * (B)attleship - 4
 * (C)ruiser - 3
 * (S)ubmarine - 3
 * (D)estroyer - 2

#### Ship Placement
**CLI**: `GET www.hitormiss.fun/setup/<syntax>`

* Syntax: ship-start-direction
* SHIP – A, B, C, S, D
* START – <row><column>
* DIRECTION – (R)ight | (L)eft | (U)p | (D)own

Syntax Examples:
- B-B6-R  -> Place the battleship starting at B6 traveling right

- A-D2-R  -> Place the Aircraft carrier starting at D2 traveling right

- C-D10-D -> Place the Cruiser starting at D10 traveling down

- S-H7-U  -> Place the Submarine starting at H7 traveling up

- D-I8-L  -> Place the Destroyer starting at I8 traveling to the left

Resulting ship placement from the example above:
```txt
            PRIMARY BOARD
              1  2  3  4  5  6  7  8  9  10
            A ~  ~  ~  ~  ~  ~  ~  ~  ~  ~
            B ~  ~  ~  ~  ~  B  B  B  B  ~
            C ~  ~  ~  ~  ~  ~  ~  ~  ~  ~
            D ~  A  A  A  A  A  ~  ~  ~  C
            E ~  ~  ~  ~  ~  ~  ~  ~  ~  C
            F ~  ~  ~  ~  ~  ~  S  ~  ~  C
            G ~  ~  ~  ~  ~  ~  S  ~  ~  ~
            H ~  ~  ~  ~  ~  ~  S  ~  ~  ~
            I ~  ~  ~  ~  ~  ~  D  D  ~  ~
            J ~  ~  ~  ~  ~  ~  ~  ~  ~  ~
```
### Targeting Ships
*You may recall these instructions using `GET www.hitormiss.fun/playhelp` at any time during setup.*

To shoot the enemy ships: `GET www.hitormiss.fun/play/<action>`

ACTION: `<row><column>`

Examples:
* D3  ->  Shoot a missile at enemy coordinate D3
* J10 ->  Shoot a missile at enemy coordinate J10

The targeting computer will notify you if you HIT or MISS your target and place an 'X' or 'O' respectively on the targeting board.

After the user has targeted the computers ships, the computer opponent will automatically return fire at the users ships.

### Winning/Losing the Game
The player who sinks all of their opponents ships first is the winner.

### Command Summary
All commands should be issued from a CLI client using the server URL `www.hitormiss.fun` and must provide either basic (username:password) or bearer (via token provided at sign-up) authorization.

NEW USER: POST www.hitormiss.fun/signup username=<username> password=<pass>

* GENERAL HELP: `GET www.hitormiss.fun/help`
* NEW USER: `POST www.hitormiss.fun/signup`
* PLAY HELP: `GET www.hitormiss.fun/playhelp`
* RULES: `GET www.hitormiss.fun/rules`
* SETUP HELP: `GET www.hitormiss.fun/setuphelp`
* START A GAME: `GET www.hitormiss.fun/setup`
* TARGET A SHIP: `GET www.hitormiss.fun/play/<row><column>`
* PLACE A SHIP: `GET www.hitormiss.fun/setup/<syntax>`





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
        THE GAME WHERE YOU GET TO LEAD YOUR SHIPS TO VICTORY!
```

**Version**: 1.0.0

**Creators**: Team !ASYNC - Katherine Smith, George McCadden III, Emery Parks, Ryan Milton, David Chambers

## System Requirements
### Local Server Installation
To install this package on your local system:
1. Clone/Fork the repository into your local system
2. Run ```npm i``` in the directory of the repository to install the required directories.
3. Local installations will also require a local MongoDB installation.  See [app-details.md](./docs/app-details.md) located in the `docs` folder for rmore information.
4. Start your MongoDB server
5. Run ```npm run start``` to start the game server.

### URL Access
If you do not want to install locally, the game server is also deployed live at `www.hitormiss.fun` and includes the necessary MongoDB server.

### Comand Line Interface (CLI)
***Hit or Miss!*** is played via the command line using the HTTP methods of GET and POST. The following HTTP command line clients have been tested successfully:

* HTTPie: `https://httpie.org/` - use with basic authorization (username:password). 

* Postman: `https://www.getpostman.com/` - can use either basic (username:password) or Bearer Authorization (a token is provided at sign up).

### Additional System Information
Full details about the server and the "behind the scenes" details of ***Hit or Miss!*** can be found in [app-details.md](./docs/app-details.md) located in the `docs` directory.

## Overview
Codefellowia is under attack and your naval armada is the only thing standing between success and mid-term project failure.

**Your mission:** Destroy the advancing enemy fleet before they destroy you!

Based on the classic game of Battleship [^1] :registered: ,  *Hit or Miss!* is a turn based game that uses the `HTTP METHODS (GET/POST)` to play.

### Footnotes:
[^1]: Source: [Marcaria.com](https://trademark-search.marcaria.com/en/Result?trademark=Battleship&country=US&status=1&mode=1)


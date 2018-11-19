# Hit Or Miss!

**Version**: 1.0.0

**Creators**: Team !ASYNC - Katherine Smith, George McCadden III, Emery Parks, Ryan Milton, David Chambers

## Important Project Documents
* [README.md](./,,/README.md) - Information about installation and instructions to play the game.
* [team-agreement.md](./docs/team-agreement.md) - Team !ASYNC's development agreement.
* [user-stories.md](./docs/user-stories.md) - User stories for the project..
* [change-logs.md](./docs/change-logs.md) - List of changes made to the project.

## Architecture
This project is built on the following primary technologies:
* JavaScript - Using ES6, but is backward compatible with Babel.
* Node.js ```https://nodejs.org/en/```
* MongoDB: ```https://docs.mongodb.com/manual/installation/``` 

## Required Dependencies
The following dependencies are found in the package.json file located in the root folder.  They should be installed correctly after an ``npm i``:
* babel-env: ^2.4.1,
* babel-eslint: ^10.0.1,
* babel-polyfill: ^6.26.0,
* babel-register: ^6.26.0,
* bcrypt: ^3.0.2,
* cors: ^2.8.4,
* dotenv: ^6.1.0,
* express: ^4.16.4,
* fs: 0.0.1-security,
* jsonwebtoken: ^8.3.0,
* mongoose: ^5.2.8

**NOTE**:  Some Windows 10 installations have experienced difficulty with bcrypt.  As such, an alternative option, ```hashing.js```, was created to accommodate those users.  It follows the bcrypt syntax so no changes need to be made should bcrypt provide a compatible version in the future.  It's important to recognize that `hashing.js` should not be used outside of this project at this time.

## Deployment
* Heroku deployment: ```hit-or-miss.herokuapp.com```
* Domain Name: ```www.hitormiss.fun``` - points at Heroku deployment.

## MongoDB Schemas
Information about the database structure can be found in the following files:
* board-model.js - used to define tracking and primary player boards.
* ship-model.js - used to define ships.
* user-model.js - used to define users.

## File Structure
```
.
├── docs
│   ├── app-details.md
│   ├── change-logs.md
│   ├── team-agreement.md
│   └── user-stories.md
├── src
│   ├── app.js
│   ├── assets
│   │   ├── help.txt
│   │   ├── hit.txt
│   │   ├── lose.txt
│   │   ├── miss.txt
│   │   ├── opponent-sunk.txt
│   │   ├── play-help.txt
│   │   ├── player-sunk.txt
│   │   ├── rules.txt
│   │   ├── setup-help.txt
│   │   ├── ships.txt
│   │   ├── start-game.txt
│   │   ├── welcome.txt
│   │   └── win.txt
│   ├── generator
│   │   ├── computer-boards.js
│   │   ├── computer-fleet.js
│   │   └── computer-user.js
│   ├── middleware
│   │   ├── 400.js
│   │   ├── 404.js
│   │   ├── auth.js
│   │   ├── error.js
│   │   ├── hashing.js
│   │   └── user-text.js
│   ├── models
│   │   ├── board-model.js
│   │   ├── ship-model.js
│   │   └── user-model.js
│   └── routes
│       ├── game-route.js
│       ├── help-route.js
│       ├── setup-route.js
│       └── user-route.js
├── tests
│   ├── app.test.js
│   ├── computer-generator.test.js
│   ├── game-route.test.js
│   ├── help-route.test.js
│   ├── setup-route.test.js
│   ├── supergoose.js
│   ├── user-model.test.js
│   ├── user-route.test.js
│   └── user-text.test.js
├── .babelrc
├── .env
├── .eslintignore
├── .eslintrc.json
├── .travis.yml
├── index.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md 

```
## Credits, Collaborations, and Resources

### Team Organization
* Image found through Google Images using the ``` labeled for noncommercial reuse with modification ``` filter.
* [Battleship](http://archive.defense.gov/DODCMSShare/NewsStoryPhoto/2009-08/hrs_090730-N-XXXXX-001c.jpg).

### Consultants
* Code Fellows: JB Tellez, Allie Grampa, Ashton Ellis

### Resources
* [ASCII generator](http://patorjk.com/software/taag/#p=display&f=Colossal&t=Hit%20or%20Miss!).

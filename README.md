# Clicker

This is still in progress! More updates to come soon.


### Overview

The challenge was to create an idle clicker style game, similar to Adventure Capitalist. The core game loop consists of:

- buying businesses
- activating them
- receiving money when their progress completes, then
- using the money received in order to buy more businesses

There are also a number of additional layers on top of the core loop, namely

- buying "managers" that will auto-start businesses (rather than the player having to click)
- purchaseable upgrades to increase yeild, decrease time, decrease price, etc

### Implementation notes

I chose to go with vanilla ES6-style JS, with no additional libraries. I did borrow concepts from my own simple 2d game engine (Stirling.js) for the basic Entity and UI classes, but all code was written for this challenge specifically.


## Project Log

### Monday 6/22
10:32am: Opening doc and reading spec

10:40am: starting planning, setting up project. 
Current focus: 
- getting a basic client setup w/ webpack
- getting a basic server setup with node/express

11:16: Client stub setup, thinking about approach

11:35: Working on listing businesses available for purchase

12:00pm: Set up basic server and stubbed out grabbing business listing at startup

12:10: Serving starter business data from server (2 entries), moving over to displaying businesses in game

12:57: added rendering / click detection framework, business listing panel

2:02: basic business listing and click detection in, moving on to player inventory management

2:46: stubbed out player inventory and added cash display. automatically ticking money upwards

3:47: added in ability to purchase businesses, ticking of progress per business, rudimentary animation of progress bars

4:25: added in ability to collect funds from businesses manually, button class, buttons for buy and collect

5:10: took a break for a bit, then realized I had the logic off from the spec (was requiring click to collect instead of click to start progress). Fixed that, now moving on to storing progress- will start w/ a cookie

5:16: thinking through data persistence (starting w/ a browser cookie)

6:28: took a bit of a break to see to my son, going with localStorage instead of cookies

7:12: finished adding in local persistence via localStorage

7:41: added code to apply offline ticks when the player reloads the game, and account for any in-progress ticks

8:34: deployed server to Heroku, changed client to point at deployed version

9:23: was away for a while for dinner, back at it to add ability to buy managers

10:26: Finished adding in UI to purchase managers and auto-start progress

10:31: Calling it a night, will add some more polish tomorrow

### Tuesday 6/23

11:16am: updating README, will likely not have much time to work on this today 

### Thursday 6/25

11:12am: back at it! Going to start by adding upgrades and achievements. First step: micro-format for tracking stats (used to determine which upgrades are available, as well as getting achievements for near-free)

11:37: Was thinking through approach to stats, achievements and upgrades a bit. Added resulting notes to root/notes/stats.md. Starting in on stat tracking

12:35: Done with setting up stats system and adding it to data loading/saving. Starting on achievements

2:00: Finished wiring up stats to various places in the code and added stat display screen. Also refactored ManagerScreen to extend a ModalScreen to make additional screens easier to add

2:37: Added list of achievements to server and refactored game start logic to make a single server call for both businesses and achievements

3:18: Added achievement tracking and notification (via alert) when a player unlocks a new achievement. Also stubbed out the achievement display panel

3:45: Added in toast to notify the player when they unlock achievements

4:04: Fixed bug with toasts showing on startup. Moving on to upgrades
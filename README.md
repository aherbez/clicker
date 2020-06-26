# Clicker

## Play it here!

The game is up on my website [here](http://adrianherbez.net/clicker/02/)

Note that it may take some time to load the first time you visit- that's due to the backend running on Heroku's free tier which sometimes takes a couple of seconds to warm up.

### Overview

The challenge was to create an idle clicker style game, similar to Adventure Capitalist. The core game loop consists of:

- buying businesses
- activating them
- receiving money when their progress completes, then
- using the money received in order to buy more businesses

There are also a number of additional layers on top of the core loop, namely

- buying "managers" that will auto-start businesses (rather than the player having to click)
- purchaseable upgrades to increase yield, decrease time, decrease price, etc
- achievements and stats

### Implementation notes

I chose to go with vanilla ES6-style JS, with no additional libraries. I did borrow concepts from my own simple 2d game engine (Stirling.js) for the basic Entity and UI classes, but all code was written for this challenge specifically.

I chose to focus on extensibility, and ensuring that all of the data that makes up the game is easily updatable from pure data. I started by setting up a rudimenatary backend and adding some JSON to server the data for the available businesses. While the server doesn't do anything but server JSON, it would be easy to add in more functionality later.

There's a ton of detail in the commit messages and the following log, but the big strokes of development were:

- set up a project with a canvas, basic game loop, and webpack to bundle it all
- set up a server and have it provide business data
- render the business data to the player
- allow for purchasing of businesses
- allow for gathering of funds from businesses
- allow for the hiring of managers to make businesses auto-start
- persisting data in between page loads via localStorage

I got all of the above done on Monday, then was busy with some other obligations on Tuesday and Wednesday. I picked it back up on Thursday.

The largest remaining task to flesh out the game was purchaseable upgrades, but I wanted to make sure that the game had the maximum amount of data-driven extensibility, so I elected to build that third. Instead, I started with code to track stats, which in turn allowed for achievements, and then achievements could unlock purchases. That might seem roundabout, but these kinds of games rely on having many little rewards for the player.

I could have implemented upgrades directly, but that would have resulted in a less engaging game. It also would have likely been harder to update and more brittle- having a microformat for the upgrades necessitated having some structure, so it just made sense to take that a little farther and expose that structure as an achievement system. So, the general approach on Thursday was to

- think through stats, achievements, and upgrades a bit
- add stat tracking to the game
- add display of stats in the game
- add a list of achievements to the server data
- start tracking achievements
- side quest: add a toast system
- add a list of upgrades to the server data
- display upgrades in game
- logic to allow/disallow upgrades based on achievements
- various tweaks here and there

I'm pretty happy with the result, given approximately two days and starting from scratch. The major downsides with the current state are, I think that:

1) it definitely could look better than it does
2) it lacks content (only 5 businesses, not many achievements or upgrades)
3) it's not at all balanced

For #1- I didn't want to spend too much time on visual polish, since that can eat up a ton of time, and this is essentially a gamejam-type scenario. In a real project, I'd hopefully be working with someone much faster and better than I am when it comes to UI design.

For #2 and #3- both of those are easily addressable given the data-driven nature of the game. All of the game's data lives in the three server-side JSON files and can be easily modified. I generally find that the best approach to implementing content (#2) is to make sure that it's quick and easy to get new content in. Similarly, I generally think that the best way to balance a game is to stand up some version of it that you can poke at, then tweak as needed.

### Microformats

I'm definitely a big fan of data-driven design, so it might make sense to call out some of the microformats built into the game's data.

#### Stats

This is pretty straightforward - just an integer per stat type for simple stats. There are a couple of additional wrinkles though, in that some stats aren't just a single number but rather a list of ids. I ended up not actually using those for any achievements (yet), but it would be easy to do so. 

I also used statIDs of greater than a certain number (200) to indicate the number of businesses owned. The larger number serves as a flag to the stat system to call into the player inventory for the value, thereby avoiding having the same data (number of businesses of each type) stored in two different places.

#### Achievements

Achievements is where it gets a little fun, in that they each have a list of one or more requirements. Each requirement has three components:

- a statID
- a target value
- a relationship (greater than, less than, greater than or equal to, or less than or equal to)

A given achievement is only unlocked if *all* of its requirements are met. I didn't end up using anything other than the >= metric, but they could be useful in the future. I did use multiple requirements for the "Diversify" achievement, which requires that the player own one or more of the first three businesses.

#### Upgrades

Upgrades are extremely high-value, so I wanted to make the player have to really work for them. That definitely means setting the price high, but also having there be some fun/challenging/difficult criteria for being able to purchase them, beyond just money. I opted to have there just be a direct mapping of each upgrade to an achievement that is required to purchase it. This is especially fun, given that achievements can be hidden, and only show up once the player has completed them. That, combined with the fact that each upgrade lists the (potentially cryptic) name of the achievement needed to unlock it, and it's a great way to drive player engagement.

But upgrades aren't any good unless they provide a benefit. I settled on having three different types of benefits in the game:

- money multipliers (increase the money generated per collection)
- cost multiplliers (decrease the cost of additional purchases)
- speed multiplies (increase the speed of businesses)

...with each of the above being able to be applied on a per-type basis. So, an upgrade has one or more sets of value consisting of

- business ID
- benefit type (1,2, or 3 for moneyMultiplier, costMultiplier, or speedMultiplier)
- the actual multiplier value

The business ID can also be set to "-1" to indicate that it should apply to all business types.

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

4:28: Added in rendering of locked and unlocked achievements to achievement display. Actually moving to upgrades 

4:36: Added in upgrade data to server data

5:31: Displaying upgrades in game w/ a new panel, including display of necessary achievements to unlock them

5:58: Added in ability to purchase upgrades, working on applying their benefits

6:29: Bonuses are being applied appropriately. Going to finish up with a bit to display state of things in the upgrade panel

6:44: Upgrade buttons now reflect the state of things - gray and w/out a buy button if the player can't buy them (either from unmet requirements or lack of funds), blue if the player *can buy them, and blue but w/ the buy button hidden if they've already bought it

6:58: Fixing achievements so that the "diversify" achivement can work, while not duplicating data on num businesses owned

7:59: Various tweaks here and there to make the colors a little more consistent and various other small changes

9:13: Took a break, then added a lot to the README. Calling it a night
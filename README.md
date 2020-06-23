# Clicker

PROJECT LOG:

## Monday 6/22
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
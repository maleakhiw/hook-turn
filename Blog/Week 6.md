# Ironing out rough patches - some quirky stuff we found (and fixed)

The task for this week was to take our static prototype, and add things like working navigation links, JavaScript code to handle menus, responsiveness, etc. In a nutshell, things that we had been doing all along, or was already handled by Bootstrap.

With that said, there were a lot of rough patches in our code that we decided to iron out. We'll go over some of those in this post.

<!-- ## Navbar positioning
### Hook/Turns logo not vertically centered
With last week's version of the prototype -->

## Route Guide
### Stopping pattern map
<!-- insert image of route line here: collage w/ desktop view on left and mobile view on left, or 2 images -->
As with our design concepts, we decided to have a horizontal "route line" and stopping pattern display for the desktop/tablet view of the page and a vertical display of the "route line" and stopping pattern for the mobile view of the page, considering the common screen orientations for both platforms. (Mobile apps are mostly used in portrait orientation, while desktop apps are mostly displayed on a wide screen in a horizontal orientation, unless you're that one coder with a portrait monitor set up to your right or left.) ~~(An aside: I really should pick one up to throw Terminal and chat windows in. Ha. Ha. In all seriousness, portrait monitors are amazing at displaying articles/documents or something that's inherently vertically long, like Reddit, forum threads, or Twitter feeds.)~~

#### Notable things:
##### Handling different screen widths
Initially we went with a `<canvas>` inside a `row` (with a `col-xs-12`) for the horizontal view (desktop), but realising that the `<canvas>` won't scroll with a scrollable `<div>` in this approach, we moved the `<canvas>` to a row inside each stop on the route's "box".

For the mobile (vertical view), we put the `<canvas>` in the same `row` as the stop name and details.

We used the "trick" of simply using responsive classes (`hidden-sm`, `hidden-md`, etc.) to let Bootstrap handle the hiding logic instead of having to define our own breakpoints in CSS - but that proved to not be enough as the `<canvas>`es were still taking up space in the boxes.

With that, we found that setting `@media` breakpoints that match Bootstrap's and setting the width and height properties, respectively, of the `<canvases>` to work just fine.

##### `More` button for the destinations
Since the `<div>` for the `More`

##### `<canvas>` and DPI scaling
On high DPI displays (like a Retina display on a MacBook/iPhone or basically any phone nowadays), you can see jagged edges around the circles on the route line. After some digging, it appears that the width and height properties of the `<canvas>` is actually different from the actual

https://www.html5rocks.com/en/tutorials/canvas/hidpi/

##### Tiling images, maintaining aspect ratio
Tiling images:

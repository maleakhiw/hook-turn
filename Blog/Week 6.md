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
On high DPI displays (like a Retina display on a MacBook/iPhone or basically any phone nowadays), you can see jagged edges around the circles on the route line. After some digging, it appears that the width and height properties of the `<canvas>` is actually different from the actual size (in actual device pixels) of the `<canvas>` on screen. This results in a blurry drawing in high-DPI displays.

<!-- insert image here -->

https://www.html5rocks.com/en/tutorials/canvas/hidpi/

##### Tiling images, maintaining aspect ratio
Tiling images:

## NextTram
### Accordions -> <div> with CSS for fade-in/out + JS for handling button clicks
Our initial design used several Bootstrap accordions for the details and reporting functionality for the upcoming trams display. With accordions, we found that the user can inadvertently have several of them open at the same time, which adds clutter, and the opening/closing animation was rather jerky.

With that, we then decided to move to `nav-tabs` and `tab-content` as with our About page.

```HTML
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#item1">Item 1, active</a>
  </li>
  <li>
    <a data-toggle="tab" href="#item2">Item 2</a>
  </li>
</ul>

<div class="tab-content">
  <div id="item1" class="tab-pane fade in active"></div>
  <div id="item2" class="tab-pane fade"></div>
```

This worked well, but we thought that `nav-tabs` that span the entire width of the `<div>` did not fit the theme, so we moved to `nav-pills`.

```HTML
<ul class="nav nav-pills center-pills">
  <li class="active"><a data-toggle="tab" class="pill-tabs" href="#moreDetails1">Details</a></li>
  <li><a data-toggle="tab" class="pill-tabs" href="#reportCrowd1">Report Crowd</a></li>
  <li><a data-toggle="tab" class="pill-tabs" href="#reportDisruption1">Report Disruption</a></li>
</ul>
```

The last problem we had to face here was the fact that the tabs (and nav-pills) took too much precious vertical space, so we took everything and put it inside an accordion (as before). The flipping arrow styles were taken from the *How it works* page.

```HTML
<div class="panel-group" id="accordion1">
  <div class="panel panel-default">
    <!-- the rest of the stuff goes here -->
  </div>
</div>
```

And now we have a fully-working interactive *NexTram* page!

## About
### Images being squished/aspect ratio not maintained
Apparently we forgot to just use the `width` property instead of `max-width` - this caused our images in the `About Us` page to be squished as in last week's demo.

**Before**
```CSS
.thumbnail img {
	height: 252px;
	width: auto;
}
```
**After**
```CSS
.thumbnail img {
	max-height: 252px;
	width: auto;
}
```


## All pages
### Navbar
- Log In and Sign Up buttons now display a modal when clicked
-

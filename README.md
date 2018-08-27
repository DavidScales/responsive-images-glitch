## Responsive images example

In this exercise you'll add responsive images to a website.

#### Getting started

To get started, you'll "remix" this project. Remixing creates a copy of the
project that you can edit. Navigate to the [edit view](https://glitch.com/edit/#!/responsive-images-exercise?path=README.md:1:0) and click __Remix This__.

Once your remixed copy spins up, you'll be able to edit code directly in the
browser.

#### Exploring the app

Click __Show__ to open the hosted app in a new tab. Opening the app should open to
the home page, and the URL will have the form `https://project-name.glitch.me/`.

You should see a handsome doggo! Observe that the image URL, image width,
and window width are all displayed.

Resize the browser window width from small to large and back again. You can resize
the window manually or by using [mobile device mode on Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode/). Observe
that no matter what size the browser window or image is, the same image resource
is loaded - `doggo-large.jpg`.

This is inefficient! The `doggo-large.jpg` file is larger that needed for
small screens like on mobile. Let's fix that.

#### Using srcset

Return to the code editor view. The app's files should be displayed. The important
files for this exercise are as follows:
* `views/index.html` contains the app's "starter code". This is the file you'll
edit.
* `views/solution.html` contains the solution code for the final version of
`index.html`, as a reference.
* `public/images/` contains all the doggo pictures.

The other files aren't too important for this exercise:
* `public/show-measurements.js` is a script that adds the image URL and measurements
to the page.
* `public/styles.css` contains the basic styles for the app.
* `.env` and `server.js` configure the app's back end, which in this case just serves
static files like a typical development server.
* `.gitignore` configures git to ignore certain files.
* `package.json` tracks app dependencies, which in this case is just [express.js](https://expressjs.com/).
* `README.md` is of course this file.

Click on `views/index.html` to open the file in the editor. Currently a standard
`<img>` tag is being used to load the `/images/doggo-large.jpg`:

```
<!-- TODO: make our image responsive! -->
<img src="/images/doggo-large.jpg" alt="A handsome doggo waiting patiently">
```

Replace the existing `<img>` tag with the one that contains the [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
attribute:

```
<img srcset="/images/doggo-small.jpg 400w,
             /images/doggo-medium.jpg 800w,
             /images/doggo-large.jpg 1200w"
     src="/images/doggo-small.jpg" alt="A handsome doggo waiting patiently">
```

The `srcset` attribute allows us to tell the browser the size of each potential
image. Since the browser also knows the size of the window, the browser can
determine and load the smallest image required. Here we have specified
the width `w` of each image as 400px, 800px, and 1200px, respectively. The
remaining `src` attribute serves as a fallback in case the browser doesn't
support `srcset` or can't load the other images.

Return to the app home page, and resize the window to be less than 400px wide.
Refresh the page and observe that the browser loaded the 400px `doggo-small.jpg`
image instead of the original `doggo-large.jpg`. Since the browser window and image are less
than 400px, and we specified that the `doggo-small.jpg` image is 400px wide, the
browser intelligently loads the small image instead of a larger one.

Awesome! Since `doggo-large.jpg` is 107kb, and `doggo-small.jpg` is 21kb, we
just reduced the app's image weight by 80% on mobile screens!

__Note:__ This exercise is assuming screen resolutions of 1x. In reality different
devices have different resolutions, and a 400px mobile screen with a 2x resolution
would need an 800px image. So data savings might not always be this dramatic in
production, but responsive images will almost always yield some significant savings.

But what about larger screens? Slowly drag the window wider and wider. After 400px
wide, the 800px `doggo-medium.jpg` image loads! If you continue to widen the browser
window, eventually the `doggo-large.jpg` loads. At each resolution, the browser
uses the image widths provided by `srcset` to ensure that the most appropriate
image is being loaded.

#### Using sizes

Currently the doggo image takes up 100% of the viewport width, which isn't typical.
Add the following `<style>` tag to the `<head>` of `views/index.html` to give the
app a responsive style:

```
<style>
  img {
    width: 90vw;
  }

  @media (min-width: 450px) {
    img {
      width: 85vw;
    }
  }

  @media (min-width: 1000px) {
    img {
      width: 75vw;
    }
  }
</style>
```

This code uses [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
to style the doggo image with a different width for different screen sizes.
The default, mobile-first style configures the image to be 90% of the viewport
width (`90vw`). If the window is over 450px, the image width is set to 85%, and
if the window is over 100px, the image width is set to 75%.

Now the app has responsive images and responsive styling! But we have introduced
one bug. In the app, resize the window to 401px and refresh the page. The 800px
`doggo-medium.jpg` image loaded even though the image width is only 361px, which
could have been covered by the 400px `doggo-small.jpg` image.

The browser loaded a larger image than necessary because the browser doesn't know
how wide the image needs to be until the HTML and CSS are finished parsing, which
is after the image is fetched. As a result, the browser makes the safe assumption
that the image will be as wide as the window. In this case that's 401px, so the 400px
`doggo-small.jpg` image would be too small.

We can specify the expected size of the image to the browser using the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
attribute. Update the `<img>` tag in `views/index.html` with the following code:

```
<img srcset="/images/doggo-small.jpg 400w,
             /images/doggo-medium.jpg 800w,
             /images/doggo-large.jpg 1200w"
     sizes="(min-width: 1000px) 75vw,
            (min-width: 450px) 85vw,
            90vw"
     src="/images/doggo-small.jpg" alt="A handsome doggo waiting patiently">
```

Now if we return to the app, the `doggo-small.jpg` image displays when the window
is 401px wide, as expected (if it doesn't, refresh the page).

Congratulations! You've updated a simple site with responsive styling and images,
ensuring that the site looks good and loads performantly on a variety of devices.

### Learn more

* MDN has a good [tutorial for responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
* `srcset` can also be used to specify the [resolution of images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Resposive_images#Resolution_switching_Same_size_different_resolutions)
* Checkout the [`<picture>`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Art_direction)
element, which works well for art direction

### Notes

All images licensed CC0, no attribution require
* doggo.jpg - https://unsplash.com/photos/17RUkJEdYzw
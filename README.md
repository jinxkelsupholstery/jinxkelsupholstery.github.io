# Jinxkels Upholstery &amp; Auto Trimmers

Static website for Jinxkels Upholstery & Auto Trimmers, Unit D3 Noble Street, Knysna Industria.
Built as plain HTML, CSS and JavaScript, and served by GitHub Pages at
<https://jinxkelsupholstery.co.za>.

## How it is published

GitHub Pages builds the `main` branch from the repository root (`/`) and serves it on the
custom domain in [`CNAME`](./CNAME). Pushing to `main` is the deploy — there is no build step
and no CI.

- `https://jinxkelsupholstery.co.za/` → `index.html`
- Unknown URLs → `404.html`
- `.nojekyll` tells Pages to skip Jekyll, so files starting with `_` are served as-is.

## Layout

```
index.html            the whole site (one page)
404.html              not-found page
assets/site.css       all styles
assets/lightbox.js    photo viewer (<dialog>-based, no dependencies)
assets/img/           photos, resize variants, and the line-art illustrations
favicon-32.png        favicon
apple-touch-icon.png  iOS home-screen icon
```

Photos are stored at two or three widths (`-400.jpg`, `-800.jpg`, `-1024.jpg`, …) and offered
via `srcset`, so phones only download the small version. The largest width is also what the
lightbox opens.

## Adding a photo

1. Resize the original into the widths you want, stripping EXIF metadata:

   ```sh
   slug=my-new-photo
   for w in 400 800 1024; do
     magick original.jpg -auto-orient -strip -resize "${w}x" -quality 82 \
       "assets/img/${slug}-${w}.jpg"
   done
   ```

2. Copy an existing `<li>` block in the `ul.gallery` in [index.html](./index.html), update the
   `src`, `srcset`, `href`/`data-full`, `sizes`, `width`/`height`, `alt` and `<figcaption>`.

Keep `width`/`height` matching the largest image's aspect ratio — they reserve space so the
page does not jump while photos load.

## Editing content

Everything is in [index.html](./index.html): hero copy, the photo captions, the contact block
and the `LocalBusiness` JSON-LD in `<head>`. Update the JSON-LD as well whenever the phone
number, email or address changes.

## History

The site started life as a WordPress install. It was exported to a static page so it could be
hosted on GitHub Pages, and has since been rewritten by hand: the WordPress theme CSS, jQuery,
the lightbox plugin and the leftover `wp-content` tree are all gone.

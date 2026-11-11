# Scale Selector

A small web app that picks a random set of musical scales to practise each day.

You choose which scales are **always** included (for example all major scales)
and which ones go into a **pool**. Each time you press **Generate**, the app
shuffles the always-included scales together with a number of random picks
from the pool.

## Features

- Major, natural minor, harmonic minor and melodic minor scales in all 12 keys
- A collapsible settings panel with per-group toggles
- Results are colour-coded: indigo for always-included scales, amber for random picks
- Settings are saved in the browser (`localStorage`) and can be reset to the defaults
- Installable as a home-screen web app, with large touch targets for tablets

## Running locally

The app is plain HTML, CSS and JavaScript with no server-side code. Either open
`index.html` directly in a browser, or serve the folder:

```sh
python -m http.server     # then open http://localhost:8000
```

## Styling (Tailwind CSS)

The page loads the compiled `output.css`. `style.css` is only the input for
Tailwind. After adding or changing Tailwind classes in `index.html` or
`generateScales.js`, rebuild the CSS:

```sh
npm install                                          # first time only
npx tailwindcss -i style.css -o output.css --watch   # rebuilds on every save
```

Leave out `--watch` for a one-off build. Commit the rebuilt `output.css`,
because that is the file the deployed site uses.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page layout, home-screen app tags, startup script |
| `generateScales.js` | Scale definitions, selection logic, settings storage, rendering |
| `style.css` | Tailwind input file |
| `output.css` | Compiled CSS (generated, but committed) |
| `tailwind.config.js` | Tailwind config: which files to scan, hover-only-with-pointer setting |
| `manifest.webmanifest` | Home-screen app name, colours and icons |
| `icons/` | App icon: `icon.svg` source, PNG sizes for iOS and the manifest |

## Customising

**Adding a scale type.** Add an entry to `SCALE_GROUPS` in `generateScales.js`:

```js
{ name: 'Dorian', suffix: ' Dorian' },
```

A new group appears automatically in the settings panel. It starts unchecked
if you already have saved settings, so tick its boxes in the panel.

**Changing the defaults.** Edit `DEFAULTS()` in `generateScales.js`. The
defaults only apply when nothing is saved yet, or after **Reset to defaults**.

**Changing the icon.** Edit `icons/icon.svg`, then regenerate the PNGs:

```sh
rsvg-convert -w 180 -h 180 icons/icon.svg -o icons/apple-touch-icon.png
rsvg-convert -w 192 -h 192 icons/icon.svg -o icons/icon-192.png
rsvg-convert -w 512 -h 512 icons/icon.svg -o icons/icon-512.png
```

## Deployment

Only these files need to be on the server:

```
index.html  generateScales.js  output.css  manifest.webmanifest  icons/
```

Any static web server works. With [Caddy](https://caddyserver.com), which runs
as a systemd service and gets HTTPS certificates automatically, the whole
config is:

```
scales.example.com {
    root * /path/to/scale-selector
    file_server
}
```

Run `sudo systemctl enable --now caddy` so the site comes back up after a
reboot. Ports 80 and 443 must be open.


## Using it on an iPad

In Safari, open the site and choose **Share → Add to Home Screen**. The app
then opens full screen with its own icon.

- iOS reads the icon, name and full-screen setting only when you add the app.
  After changing any of them, remove the icon and add it again.
- The home-screen app keeps its own storage, separate from Safari. Settings
  made in Safari don't carry over, and removing the icon deletes the saved
  settings.

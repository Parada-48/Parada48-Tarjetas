# KM48 · Tarjeta AR

The web page that opens when someone scans the QR on the back of a Kilómetro 48 card. The phone's camera turns on and the car from that card appears standing on top of the card. People can rotate it, see how it was customized, change its scale, take photos, and place it on a table in AR. No app needed: it runs in the phone's browser.

It follows the Figma mockup **Interfaz AR – Mockup** (Diseño TP3 TIFF).

```
km48-ar/
├── index.html   ← the page (design + logic)
├── autos.js     ← card data: the only file you normally edit
├── models/      ← the 3D cars (auto-025.glb = SUV Flama Hot)
├── targets/     ← the card backs the camera recognizes (025.mind)
├── lib/         ← AR libraries (MindAR + three.js), served from your own site
└── README.md
```

## How it works

1. Each card's QR holds its own link, e.g. `https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=025`. The number picks the car in `autos.js`.
2. The page opens the camera and looks for **the back of that card** (`targets/025.mind`).
3. When it finds the card, the car appears standing on it and follows the card as you move the phone or the card.

The card's real size is known, so the car is shown at true scale. At 1:64 it's 6.9 cm long, so it fits on the 9 cm card. At 1:43 it's 10.2 cm and sticks out past the edges.

## The screens

| State | What you see |
|---|---|
| **Looking for the card** | Camera view with a yellow card-shaped frame and "Apuntá la cámara al dorso de tu tarjeta". Below it, "Ver el auto sin la tarjeta" shows the car in 3D without the card. |
| **On the card** (default) | The car stands on the card with the rotation ring around it. Drag sideways to rotate it. Top: ✕, the title chip, ⓘ. Bottom: **Escala**, the rotate hint, **Cámara**. |
| **Info (ⓘ)** | The customization chips (Techo, Carrocería, Decorado, Luces) with lines that point to those parts of the car as it moves. |
| **Escalas** | The glass sheet with 1:12 … 1:87 and the length in cm. The car on the card changes size live. **Ubicar a 1:43** places it on a table with the phone's own AR (see below). |
| **Cámara** | Photo mode: the shutter saves the camera view with the car on the card. **Galería** shows the last photo with **Compartir** and **Guardar**. |
| **Without the card** | The 3D viewer from before, over the camera view. A "Ver sobre la tarjeta" button returns to the card. Computers always open this view, with a QR to open the page on a phone. |

### "Ubicar": the car on a table at real scale

- **iPhone / iPad (Safari):** Apple's AR Quick Look, at the chosen scale.
- **Android with ARCore + Chrome:** AR inside the page (WebXR), at the chosen scale.
- **Older Android:** Google's Scene Viewer. The user pinches to resize it because the page can't set the scale there.

When the user comes back from AR, the page returns to the card. On iPhone, if it doesn't, the "Ver sobre la tarjeta" button does it.

## Card tracking: what makes it work well

- The camera has to recognize the **printed artwork**. If the back's design changes (colors, layout, the QR), the `.mind` file has to be made again from the new design.
- **Matte paper works best.** Glossy lamination reflects light and hides the artwork from the camera.
- Good light and the whole card in view. Holding the phone 15–30 cm away works best.
- `targets/025.mind` contains **the 4 color versions** of the back (blue, yellow, red, orange), so any of them works. Once you choose the final one, it can contain just that version. The file shrinks from 1.8 MB to about 0.45 MB and finds the card faster.
- **The blue and red backs have a white QR on a dark background** (inverted). Most phones read it, but test it with a couple of iPhones and Androids before printing. The yellow and orange backs use a dark QR, which every phone reads.

## Adding another card

1. **The car:** export its `.glb` into `models/` (e.g. `models/auto-014.glb`).
2. **The QR:** make it from `https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=014` and put it on that card's back in Figma.
3. **The tracking file:** export the finished back (with its QR) from Figma as a PNG about 1000 px wide. Open the MindAR compiler at **hiukim.github.io/mind-ar-js-doc/tools/compile**, drop the image in, click **Start**, then **Download**. Rename the file `014.mind` and put it in `targets/`.
4. **The data:** in `autos.js`, copy the `"025"` block, change the id to `"014"` and update the fields.

### Fields in `autos.js`

- `nombre`, `numero`, `creador`: the title chip.
- `modelo`: the car's `.glb`.
- `tarjeta`: the card back's `.mind`. Without it, the page shows the car in 3D without following the card.
- `color`: the body paint (paints the material called "Pintura").
- `largoReal`: the real car's length in meters (4.4). It sets the cm for each scale.
- `escalaTarjeta`: the scale it appears at on the card (default `"1:64"`).
- `escalaInicial`: the scale for the view without the card and for "Ubicar".
- `giroTarjeta`: which way the car faces when it appears, in degrees (`-30` = nose turned toward the viewer).
- `orbitaInicial`: the starting angle in the view without the card.
- `personalizacion`: the info chips. `pantalla: [x, y]` is where the chip sits on screen (0–1). `punto: "x y z"` is the part of the car the line points to. To get a new point, open the page with `?auto=025&editar=1` and tap the car.

At the bottom of the file:

- `KM48_TARJETA = { ancho: 0.090 }`: the printed back's width from edge to edge, in meters. If the printed card isn't exactly 90 mm wide, change it so the scales stay exact.
- `KM48_SITIO`: where ✕ goes if the person arrived straight from the QR.
- `KM48_FONDO`: a background image for when there's no camera.

## Publishing (GitHub Pages)

The site is live at `https://juanpablogdesign.github.io/Parada48-Tarjetas/`. To update it, open the repository on GitHub, click **Add file → Upload files**, and drag in the changed files and folders. Drag the `lib` and `targets` **folders themselves** so they keep their names, then click **Commit changes**. It updates in 1–2 minutes.

The camera only works over **https**, so test with the published link, not by opening the file on your computer.

## Testing

- `?vista=libre`: opens the view without the card.
- `?vista=tarjeta`: forces card tracking on a computer with a webcam (hold the card up to the camera).
- `?debug`: exposes the AR state in the browser console.
- Locally: `python3 -m http.server 8000` in this folder, then open `http://localhost:8000/?auto=025&vista=tarjeta`. Browsers allow the camera on `localhost`.

## Credits

- Card tracking: [MindAR](https://github.com/hiukim/mind-ar-js) 1.1.5 (MIT). The online compiler uses the same version. The libraries are in `lib/` (see `lib/LICENCIAS.txt`).
- 3D viewer and table AR: Google's [`<model-viewer>`](https://modelviewer.dev) 4.1.0.
- Typeface: Plus Jakarta Sans (Google Fonts).

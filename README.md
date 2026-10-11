# KM48 · Tarjeta AR

The web page that opens when someone scans the QR on the back of a Kilómetro 48 card. The phone's camera turns on and the car from that card appears standing on top of the card. People can rotate it, see how it was customized, change its scale, take photos, and place it on a table in AR. No app needed: it runs in the phone's browser.

It follows the Figma mockup **Interfaz AR – Mockup** (Diseño TP3 TIFF).

```
km48-ar/
├── index.html   ← the page (design + logic)
├── autos.js     ← card data: the only file you normally edit
├── models/      ← the 3D cars (suv-flama-hot.glb, suv-base.glb)
├── targets/     ← the card backs the camera recognizes (todas.mind: one per color)
├── lib/         ← AR libraries (MindAR + three.js), served from your own site
└── README.md
```

## How it works

1. Each card's QR holds its own link, e.g. `https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=014`. The number picks the car in `autos.js`.
2. The page opens the camera and looks for **the back of a KM48 card** (`targets/todas.mind` has one back of each color).
3. While the camera is on, the page also **reads the QR** on the card. If the person points at a different card, it switches to that card's car, so several cards can be shown one after another.

**One link for every card:** `https://juanpablogdesign.github.io/Parada48-Tarjetas/` (without a number). It opens the camera and waits for any card: point at a card and its car appears; point at the next one and the car changes. Handy for events or for showing all the cards with one phone.
3. When it finds the card, the car appears standing on it and follows the card as you move the phone or the card.

The card's real size is known, so the car is shown at true scale. At 1:64 it's 6.9 cm long, so it fits on the 9 cm card. At 1:43 it's 10.2 cm and sticks out past the edges.

## The screens

| State | What you see |
|---|---|
| **Looking for the card** | Camera view with a yellow card-shaped frame and "Apuntá la cámara al dorso de tu tarjeta". The car's name chip and ⓘ stay hidden until the camera recognizes the card. Below it, "Ver el auto sin la tarjeta" shows the car in 3D without the card. |
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

- The camera has to recognize the **printed artwork**. If the back's design changes (colors or layout), `targets/todas.mind` has to be made again from the new design. A new QR alone doesn't need it.
- **Matte paper works best.** Glossy lamination reflects light and hides the artwork from the camera.
- Good light and the whole card in view. Holding the phone 15–30 cm away works best.
- `targets/todas.mind` was made from the final backs of cards 001 (orange), 002 (blue), 004 (yellow) and 007 (red). It recognizes every card of those four colors; which car to show comes from the QR.
- For the QR to be read, the card should fill a good part of the screen (about 15–30 cm away).
- **The blue and red backs have a white QR on a dark background** (inverted). Most phones read it, but test it with a couple of iPhones and Androids before printing. The yellow and orange backs use a dark QR, which every phone reads.

## The 3D models

| File | Car | Used by |
|---|---|---|
| `models/sedan.glb` | Sedán (from `autitos.obj`) | 001, 008, 009, 016 |
| `models/coupe.glb` | Coupé (from `autitos.obj`) | 002, 005, 011 |
| `models/pickup.glb` | Pickup (from `autitos.obj`) | 003, 006, 012, 015 |
| `models/suv-base.glb` | SUV without roof box or flames (from `autitos.glb`) | 004, 007, 010, 013 |
| `models/suv-flama-hot.glb` | SUV with roof box and flames | 014 (and the old 025 test card) |

The OBJ had the cars lying at an angle, so they were turned upright, put at real size (sedán 4.5 m, coupé 4.3 m, pickup 5.3 m) and given web materials. The OBJ came without its `.mtl` file, so the colors of glass, tyres, rims and lights were set by hand. Each card paints its car's body with `color` and its headlights with the card's light color (`autos.js`).

The cards' extras (stripes, decals, siren, taxi sign, roof racks) aren't in the 3D files yet, so the cars show the right body and color without them. To add them: export them from 3ds Max (or a new `.obj` + `.mtl`) and they can be attached to each car.

## Adding another card

1. **The car:** export its `.glb` into `models/` (e.g. `models/auto-017.glb`).
2. **The QR:** make it from `https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=014` and put it on that card's back in Figma.
3. **The tracking file:** nothing to do if the new card uses one of the four existing colors. For a new back design, export one back of each color from Figma as PNGs about 1000 px wide, drop them all into the MindAR compiler at **hiukim.github.io/mind-ar-js-doc/tools/compile**, click **Start**, then **Download**, and replace `targets/todas.mind`.
4. **The data:** in `autos.js`, copy a line like `"013"`, change the id to `"017"` and update the fields.

### Fields in `autos.js`

- `nombre`, `numero`, `creador`: the title chip.
- `modelo`: the car's `.glb`.
- `color`: the body paint (paints the material called "Pintura").
- `largoReal`: the real car's length in meters (4.4). It sets the cm for each scale.
- `escalaTarjeta`: the scale it appears at on the card (default `"1:64"`).
- `escalaInicial`: the scale for the view without the card and for "Ubicar".
- `giroTarjeta`: which way the car faces when it appears, in degrees (`-30` = nose turned toward the viewer).
- `orbitaInicial`: the starting angle in the view without the card.
- `personalizacion`: the info chips. `pantalla: [x, y]` is where the chip sits on screen (0–1). `punto: "x y z"` is the part of the car the line points to. To get a new point, open the page with `?auto=014&editar=1` and tap the car.

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
- Locally: `python3 -m http.server 8000` in this folder, then open `http://localhost:8000/?auto=014&vista=tarjeta`. Browsers allow the camera on `localhost`.

## Credits

- Card tracking: [MindAR](https://github.com/hiukim/mind-ar-js) 1.1.5 (MIT). The online compiler uses the same version. The libraries are in `lib/` (see `lib/LICENCIAS.txt`).
- 3D viewer and table AR: Google's [`<model-viewer>`](https://modelviewer.dev) 4.1.0.
- Typeface: Plus Jakarta Sans (Google Fonts).

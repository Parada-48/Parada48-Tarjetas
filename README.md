# KM48 · Tarjeta AR

The web page that opens when someone scans the QR on a Kilómetro 48 card. It follows the Figma mockup **Interfaz AR – Mockup** (Diseño TP3 TIFF): the phone's camera fills the screen, the customized car sits on top of it, and the user can rotate it, see how it was customized, take photos, choose a scale and place it on the table in real AR. No app to install: it runs in the phone's browser.

```
km48-ar/
├── index.html   ← the page (design + logic)
├── autos.js     ← car data — the only file you normally edit
├── models/      ← the cars (auto-025.glb = SUV Flama Hot)
└── README.md
```

## The screens (same as the mockup)

| Mockup state | On the page |
|---|---|
| **Default** | Live camera behind the 3D car with its rotation ring. Top: ✕, the title chip (name, Nº, creator) and ⓘ. Bottom: **Escala**, the "Deslizá sobre el auto para rotarlo" hint, and **Cámara**. Drag the car to rotate it. |
| **Escalas** | Tapping **Escala** slides up the glass sheet. Swipe the circles (1:12 … 1:87); the selected one turns yellow and each shows its length in cm. Drag the sheet down by its handle to close it. **Ubicar a 1:43** (top-right of the sheet) opens real AR with the car at exactly that size on the table. |
| **Info** | ⓘ shows the personalization chips (Techo, Carrocería, Decorado, Luces) with lines that follow the car as it rotates. |
| **Cámara** | Opens photo mode: the shutter takes a photo of the camera view with the car in it, and **Galería** shows the last photo with **Compartir** and **Guardar**. ✕ goes back. |

On a computer there is no camera background: the page shows the KM48 navy (or your own image, see below) and a QR to open it on a phone.

### Real AR ("Ubicar a …")

- **iPhone / iPad (Safari):** opens Apple's AR Quick Look at the chosen scale, locked so it can't be resized by accident.
- **Android with Chrome and ARCore:** AR runs inside the page (WebXR) at the chosen scale.
- **Older Android phones:** open Google's Scene Viewer, which always loads the original file, so the page can't force the scale; the user is told to pinch to resize.

The camera background, rotation, info and photos work on any phone; only "Ubicar" needs an AR-capable phone, and the button only appears when it's available.

## 1. The car model

`models/auto-025.glb` is the SUV Flama Hot exported from 3ds Max (`autitos.glb`), prepared for the web. The geometry and textures are untouched; these things were adjusted:

- **Paint:** most of the body came out as 3ds Max's black "fallback Material" (the exporter's placeholder for a material it couldn't convert). It's now a red material called **Pintura**. The page can repaint it per card with `color` in `autos.js`.
- **Invalid values:** the roof box's glossy plastic and chrome had negative roughness (‑1.5 and ‑5), which glTF doesn't allow. They're now 0.28 and 0.18, and chrome is metallic.
- **Finish:** rims/lights slightly metallic; tyres matte; black hood and roof less mirror-like.
- **Position and size:** the car is turned to face forward (+X), its wheels sit on the ground, and it's 4.4 m long (it was about 2 cm in the export).
- **Flame decals:** the exported decals were flat sheets floating 1–7 cm off the curved doors. They're rebuilt as a fine mesh projected onto the body, 4 mm above the paint, with the same artwork and mapping.
- **Plates:** the exported plates had scrambled texture coordinates (the KM48 image came out rotated and cropped) and stood off the bumpers. They're now 40 × 18 cm plates with the image's real proportions, the front one flush above the bumper lip and the rear one inside the tailgate's plate recess.

For other cars exported from 3ds Max: use **Physical Material** with image textures (V-Ray/Corona/Arnold materials and procedural maps don't export), then check the .glb on modelviewer.dev/editor before uploading. From Blender: **File → Export → glTF 2.0 → glTF Binary (.glb)**.

## 2. Edit the car data (`autos.js`)

- `nombre`, `numero`, `creador` — the title chip.
- `color` — the body paint, e.g. `"#C8140F"`.
- `largoReal` — the real car's length in **meters**. It sets the cm shown for each scale and the AR size (4.4 m → 10,2 cm at 1:43).
- `escalaInicial` — the scale selected at first.
- `orbitaInicial` — the starting camera angle, e.g. `"30deg 72deg auto"` (turn, tilt, distance). Adjust the first number until the car faces like in the mockup.
- `personalizacion` — the info chips:
  - `titulo`, `valor` (and `cursiva: true` for italic, like "Decal Acalorado").
  - `pantalla: [x, y]` — where the chip sits, as a fraction of the screen (the mockup positions are already set).
  - `punto: "x y z"` — the spot on the car the line points to (already set on the roof box, the side, the flame decal and the headlight). **To change one:** open the page with `?auto=025&editar=1`, tap that part of the car and the page shows and copies the coordinates. Paste them here.

Optional settings at the bottom of the file:

- `KM48_SITIO` — where ✕ takes people who arrived straight from the QR (e.g. the KM48 website). Empty hides ✕ in that case.
- `KM48_FONDO` — a background image for when there's no camera (computer, or camera permission denied). To use the desk photo from the mockup: in Figma select the **Fondo** layer, export it as JPG, save it as `img/fondo.jpg` and set `KM48_FONDO = "img/fondo.jpg"`.

To add more cards, copy the car block (instructions inside the file). Each card gets its own link: `…/?auto=014`, `…/?auto=025`…

## 3. Publish it (free)

The camera and AR only work over **https**, so the page has to be online.

**GitHub Pages**
1. Create a public repository called `km48-ar` on github.com.
2. **Add file → Upload files**, drag in `index.html`, `autos.js` and the `models` folder (and `img` if you added a background), then **Commit**.
3. **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**.
4. After a minute it's live at `https://YOUR-USER.github.io/km48-ar/`.

**Netlify Drop:** drag the whole `km48-ar` folder onto app.netlify.com/drop and you get an `https://…netlify.app` link right away.

## 4. The QR for the card

Use the published link with the card's id, e.g. `https://YOUR-USER.github.io/km48-ar/?auto=025`. Make the QR from that exact link, test it with your phone, and print it at least 2 cm wide.

## Testing on your computer

Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`. You'll see the 3D car, the ring, the info chips, the scale sheet and photo mode (over the navy background). The camera and AR need the published https link on a phone.

## Notes

- The page asks for camera permission when it opens on a phone. If the user says no, everything still works over the background.
- Photos are kept only while the page is open; **Guardar** or **Compartir** them to keep them.
- Typeface: **Plus Jakarta Sans** (Google Fonts), as in the mockup.
- Built with Google's [`<model-viewer>`](https://modelviewer.dev) 4.1.0, loaded from jsDelivr.

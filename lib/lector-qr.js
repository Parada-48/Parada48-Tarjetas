// Lee el QR de la tarjeta en segundo plano, para no frenar el seguimiento de la tarjeta.
// Recibe { datos, ancho, alto } (píxeles RGBA) y responde con el texto del QR o null.
importScripts('jsQR.js');
onmessage = e => {
  const { datos, ancho, alto } = e.data;
  let texto = null;
  try {
    const r = self.jsQR(new Uint8ClampedArray(datos), ancho, alto, { inversionAttempts: 'attemptBoth' });
    texto = (r && r.data) || null;
  } catch (_) {}
  postMessage(texto);
};

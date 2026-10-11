/*
  KM48 · Tarjeta AR — datos de los autos
  ----------------------------------------
  Este es el único archivo que necesitás editar para sumar o cambiar autos.

  Cada tarjeta tiene su propio QR que abre esta página con ?auto=<id>
  Ejemplo:  https://TU-USUARIO.github.io/km48-ar/?auto=025

  Campos de cada auto:
    nombre          Título del chip superior.
    numero          Número de la tarjeta (ej. "25/125").
    creador         Quién lo personalizó.
    modelo          Ruta al .glb dentro de /models.
    color           (opcional) Color de la pintura, ej. "#C8140F". Pinta el material
                    "Pintura" del modelo, así el mismo SUV sirve para varias tarjetas.
    modeloDemo      (opcional) Modelo de prueba si el .glb no carga.
    largoReal       Largo del auto REAL en metros. Se usa para el tamaño exacto
                    en cada escala (1:43 → largoReal / 43).
    escalaInicial   Escala con la que abre la página.
    orbitaInicial   Ángulo inicial de la cámara: "giro inclinación distancia".
                    Probá valores hasta que el auto quede como en el mockup.
    personalizacion Etiquetas que aparecen al tocar el botón de info (i):
                    titulo / valor  textos del chip
                    cursiva         true para mostrar el valor en cursiva
                    punto           "x y z" del lugar del auto al que apunta la línea.
                                    Para obtenerlo abrí la página con ?auto=025&editar=1
                                    y tocá el auto: te muestra y copia las coordenadas.
                    pantalla        [x, y] dónde va el chip, como fracción de la pantalla
                                    (0 = izquierda/arriba, 1 = derecha/abajo).
*/

window.KM48_AUTOS = {
  "025": {
    nombre: "SUV Flama Hot",
    numero: "25/125",
    creador: "Carlos Tolosa",
    modelo: "models/auto-025.glb",
    color: "#C8140F",          // pintura de la carrocería (podés cambiarla por tarjeta)
    largoReal: 4.4,
    escalaInicial: "1:43",
    orbitaInicial: "35deg 72deg auto",
    // Puntos ubicados sobre el modelo del SUV (baúl de techo, lateral, decal y faro).
    personalizacion: [
      { titulo: "Techo",      valor: "Porta Equipaje",  punto: "-0.59 2.10 -0.01", pantalla: [0.22, 0.17] },
      { titulo: "Carrocería", valor: "SUV",             punto: "0.71 1.08 1.06",   pantalla: [0.79, 0.25] },
      { titulo: "Decorado",   valor: "Decal Acalorado", punto: "-0.01 0.72 1.01",  pantalla: [0.17, 0.65], cursiva: true },
      { titulo: "Luces",      valor: "Ámbar",           punto: "2.01 0.63 0.72",   pantalla: [0.83, 0.64] }
    ]
  }

  // Para sumar otra tarjeta, copiá el bloque de arriba, poné una coma
  // después de la llave } y cambiá el id ("014", "026"…) y los datos.
};

// Escalas disponibles en el selector (de más grande a más chica).
window.KM48_ESCALAS = ["1:12", "1:16", "1:18", "1:24", "1:43", "1:48", "1:64", "1:87"];

// Auto que se muestra si el link no trae ?auto=
window.KM48_AUTO_POR_DEFECTO = "025";

// (Opcional) Adónde lleva la X si la persona llegó directo desde el QR.
// Ejemplo: "https://kilometro48.com.ar". Vacío = la X se oculta en ese caso.
window.KM48_SITIO = "";

// (Opcional) Imagen de fondo cuando no hay cámara (computadora, permiso denegado).
// Ejemplo: "img/fondo.jpg" (podés exportar el fondo del mockup desde Figma).
window.KM48_FONDO = "";

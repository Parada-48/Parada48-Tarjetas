/*
  KM48 · Tarjeta AR — datos de los autos
  ----------------------------------------
  Este es el único archivo que necesitás editar para sumar o cambiar autos.

  Cada tarjeta tiene su propio QR que abre esta página con ?auto=<número>
  Ejemplo:  https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=014

  Campos de cada auto:
    nombre          Título del chip superior.
    numero          Número de la tarjeta (ej. "014/120").
    creador         Quién lo personalizó.
    modelo          Ruta al .glb dentro de /models.
    tarjeta         Archivo .mind con el dorso impreso de ESA tarjeta (con su QR), para que
                    el auto aparezca parado SOBRE la tarjeta. Sin este dato, la página
                    muestra el auto en 3D sin seguir la tarjeta.
    color           Color de la carrocería, ej. "#C8140F" (pinta el material "Pintura").
    colores         (opcional) Otros materiales a pintar, por nombre: { Material__418: "#E6E8EA" }
                    (en el SUV, Material__418 es el capó y el techo negros).
    largoReal       Largo del auto REAL en metros. Se usa para el tamaño exacto
                    en cada escala (1:43 → largoReal / 43).
    escalaTarjeta   (opcional) Escala con la que aparece sobre la tarjeta (si no, "1:64").
    escalaInicial   (opcional) Escala de la vista sin tarjeta y de "Ubicar" (si no, "1:43").
    giroTarjeta     (opcional) Hacia dónde mira el auto sobre la tarjeta, en grados.
    orbitaInicial   (opcional) Ángulo inicial en la vista sin tarjeta: "giro inclinación distancia".
    personalizacion Etiquetas del botón de info (i): titulo, valor, punto "x y z" del auto
                    al que apunta la línea (se obtiene con ?auto=014&editar=1 tocando el auto)
                    y pantalla [x, y] dónde va el chip (0–1).

  MODELOS 3D: por ahora solo existe el SUV. Las tarjetas de sedán, coupé y pickup
  usan el SUV pintado de su color hasta que se agreguen sus modelos: exportá cada auto
  como .glb, ponelo en /models y cambiá su "modelo" (y los "punto" de sus etiquetas).
*/

// Puntos de las etiquetas sobre el SUV (techo, lateral, capó o decorado, faro)
const PUNTOS_SUV = { techo: "-0.40 1.70 0.00", lado: "0.71 1.08 1.06", decorado: "1.04 1.12 0.00", faro: "2.01 0.63 0.72" };
const PUNTOS_SUV_FLAMA = { techo: "-0.59 2.10 -0.01", lado: "0.71 1.08 1.06", decorado: "-0.01 0.72 1.01", faro: "2.01 0.63 0.72" };

// Las cuatro etiquetas de la franja roja de la tarjeta
function etiquetas(carroceria, decorado, luces, techo, p) {
  p = p || PUNTOS_SUV;
  return [
    { titulo: "Techo",      valor: techo,      punto: p.techo,    pantalla: [0.22, 0.17] },
    { titulo: "Carrocería", valor: carroceria, punto: p.lado,     pantalla: [0.79, 0.25] },
    { titulo: "Decorado",   valor: decorado,   punto: p.decorado, pantalla: [0.17, 0.65], cursiva: true },
    { titulo: "Luces",      valor: luces,      punto: p.faro,     pantalla: [0.83, 0.64] }
  ];
}

// Pinta la carrocería y también el capó/techo negro del SUV, para que el auto quede de un solo color
function pintura(hex) { return { color: hex, colores: { Material__418: hex } }; }

const SUV = "models/suv-base.glb";            // SUV sin baúl ni llamas
const SUV_FLAMA = "models/suv-flama-hot.glb"; // SUV de Carlos Tolosa, con baúl de techo y llamas
const LARGO = { suv: 4.4, sedan: 4.5, coupe: 4.3, pickup: 5.3 };

window.KM48_AUTOS = {
  "001": { nombre: "Sedán Drift Clásico", numero: "001/120", creador: "Fabricio Castillo",
           modelo: SUV, /* provisorio: falta el modelo del sedán */ tarjeta: "targets/001.mind",
           ...pintura("#E8850F"), largoReal: LARGO.sedan,
           personalizacion: etiquetas("Sedán", "Cuadriculado", "Naranja", "Techo liso") },

  "002": { nombre: "Coupé Plata Boreal", numero: "002/120", creador: "Ana María Sosa",
           modelo: SUV, /* provisorio: falta el modelo del coupé */ tarjeta: "targets/002.mind",
           ...pintura("#BFC3C8"), largoReal: LARGO.coupe,
           personalizacion: etiquetas("Coupé", "Rayas rojas", "Amarilla", "Faros retráctiles") },

  "003": { nombre: "Pickup Nitro 48", numero: "003/120", creador: "Lucía Fernández",
           modelo: SUV, /* provisorio: falta el modelo de la pickup */ tarjeta: "targets/003.mind",
           ...pintura("#C8327E"), largoReal: LARGO.pickup,
           personalizacion: etiquetas("Pickup", "Rayas blancas", "Naranja", "Caja de carga") },

  "004": { nombre: "SUV Ruta Azul", numero: "004/120", creador: "Martín Gómez",
           modelo: SUV, tarjeta: "targets/004.mind",
           ...pintura("#A9ADB3"), largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Tribal", "Amarilla", "Barras de techo") },

  "005": { nombre: "Coupé Tormenta Furioso", numero: "005/120", creador: "Sofía Romero",
           modelo: SUV, /* provisorio: falta el modelo del coupé */ tarjeta: "targets/005.mind",
           ...pintura("#E8930F"), largoReal: LARGO.coupe,
           personalizacion: etiquetas("Coupé", "Rayas negras", "Blanca", "Antena deportiva") },

  "006": { nombre: "Pickup Ónix Total", numero: "006/120", creador: "Joaquín Herrera",
           modelo: SUV, /* provisorio: falta el modelo de la pickup */ tarjeta: "targets/006.mind",
           ...pintura("#B0170C"), largoReal: LARGO.pickup,
           personalizacion: etiquetas("Pickup", "Tribal negro", "Naranja", "Caja de carga") },

  "007": { nombre: "SUV Sombra Clásico", numero: "007/120", creador: "Valentina Díaz",
           modelo: SUV, tarjeta: "targets/007.mind",
           ...pintura("#E6E8EA"), largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Patrulla", "Amarilla", "Sirena") },

  "008": { nombre: "Sedán Puma Urbano", numero: "008/120", creador: "Tomás Acosta",
           modelo: SUV, /* provisorio: falta el modelo del sedán */ tarjeta: "targets/008.mind",
           ...pintura("#2AA3D3"), largoReal: LARGO.sedan,
           personalizacion: etiquetas("Sedán", "Zarpazo", "Verde", "Techo liso") },

  "009": { nombre: "Sedán Jaguar Salvaje", numero: "009/120", creador: "Camila Benítez",
           modelo: SUV, /* provisorio: falta el modelo del sedán */ tarjeta: "targets/009.mind",
           ...pintura("#1E8C3A"), largoReal: LARGO.sedan,
           personalizacion: etiquetas("Sedán", "Rayas blancas", "Verde", "Barras de techo") },

  "010": { nombre: "SUV Cromo Max", numero: "010/120", creador: "Nicolás Ruiz",
           modelo: SUV, tarjeta: "targets/010.mind",
           ...pintura("#E8B400"), largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Taxi", "Naranja", "Cartel de taxi") },

  "011": { nombre: "Coupé Noche XL", numero: "011/120", creador: "Agustina Molina",
           modelo: SUV, /* provisorio: falta el modelo del coupé */ tarjeta: "targets/011.mind",
           ...pintura("#2A2B30"), largoReal: LARGO.coupe,
           personalizacion: etiquetas("Coupé", "Línea roja", "Ámbar", "Antena deportiva") },

  "012": { nombre: "Pickup Pampa Azul", numero: "012/120", creador: "Federico Ríos",
           modelo: SUV, /* provisorio: falta el modelo de la pickup */ tarjeta: "targets/012.mind",
           ...pintura("#E9EAEC"), largoReal: LARGO.pickup,
           personalizacion: etiquetas("Pickup", "Rayas azules", "Amarilla", "Canasto de techo") },

  "013": { nombre: "SUV Ciclón Dorado", numero: "013/120", creador: "Julieta Peralta",
           modelo: SUV, tarjeta: "targets/013.mind",
           ...pintura("#2B9ED6"), largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Raya blanca", "Verde", "Canasto de techo") },

  "014": { nombre: "SUV Flama Hot", numero: "014/120", creador: "Carlos Tolosa",
           modelo: SUV_FLAMA, tarjeta: "targets/014.mind",
           color: "#C8140F", largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Decal Acalorado", "Ámbar", "Porta Equipaje", PUNTOS_SUV_FLAMA) },

  "015": { nombre: "Pickup Acero Extremo", numero: "015/120", creador: "Florencia Ortiz",
           modelo: SUV, /* provisorio: falta el modelo de la pickup */ tarjeta: "targets/015.mind",
           ...pintura("#E07A0C"), largoReal: LARGO.pickup,
           personalizacion: etiquetas("Pickup", "Raya blanca", "Naranja", "Caja de carga") },

  "016": { nombre: "Sedán Cometa Nocturno", numero: "016/120", creador: "Matías Aguirre",
           modelo: SUV, /* provisorio: falta el modelo del sedán */ tarjeta: "targets/016.mind",
           ...pintura("#D9DCDF"), largoReal: LARGO.sedan,
           personalizacion: etiquetas("Sedán", "Llama tribal", "Amarilla", "Alerón de techo") },

  // Tarjeta de prueba anterior (el QR ?auto=025 de las tarjetas de referencia en Figma)
  "025": { nombre: "SUV Flama Hot", numero: "25/125", creador: "Carlos Tolosa",
           modelo: SUV_FLAMA, tarjeta: "targets/025.mind",
           color: "#C8140F", largoReal: LARGO.suv,
           personalizacion: etiquetas("SUV", "Decal Acalorado", "Ámbar", "Porta Equipaje", PUNTOS_SUV_FLAMA) }
};

// Valores que comparten todos los autos (cada auto puede cambiarlos)
Object.values(window.KM48_AUTOS).forEach(a => {
  a.escalaInicial = a.escalaInicial || "1:43";
  a.escalaTarjeta = a.escalaTarjeta || "1:64";
  a.orbitaInicial = a.orbitaInicial || "35deg 72deg auto";
  if (a.giroTarjeta === undefined) a.giroTarjeta = -30;
});

// Escalas disponibles en el selector (de más grande a más chica).
window.KM48_ESCALAS = ["1:12", "1:16", "1:18", "1:24", "1:43", "1:48", "1:64", "1:87"];

// Auto que se muestra si el link no trae ?auto=
window.KM48_AUTO_POR_DEFECTO = "014";

// Tamaño real del dorso impreso, de borde a borde, en metros (90 mm = 0.090).
// Con este dato el auto se ve sobre la tarjeta al tamaño exacto de cada escala.
window.KM48_TARJETA = { ancho: 0.090 };

// (Opcional) Adónde lleva la X si la persona llegó directo desde el QR.
// Ejemplo: "https://kilometro48.com.ar". Vacío = la X se oculta en ese caso.
window.KM48_SITIO = "";

// (Opcional) Imagen de fondo cuando no hay cámara (computadora, permiso denegado).
// Ejemplo: "img/fondo.jpg" (podés exportar el fondo del mockup desde Figma).
window.KM48_FONDO = "";

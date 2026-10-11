/*
  KM48 · Tarjeta AR — datos de los autos
  ----------------------------------------
  Este es el único archivo que necesitás editar para sumar o cambiar autos.

  Cada tarjeta tiene su propio QR que abre esta página con ?auto=<número>
  Ejemplo:  https://juanpablogdesign.github.io/Parada48-Tarjetas/?auto=014
  El link sin número (…/Parada48-Tarjetas/) sirve para cualquier tarjeta: la página lee
  el QR con la cámara y muestra el auto de cada tarjeta a la que se apunte.

  Campos de cada auto:
    nombre          Título del chip superior.
    numero          Número de la tarjeta (ej. "014/120").
    creador         Quién lo personalizó.
    modelo          Ruta al .glb dentro de /models.
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

  MODELOS 3D: models/sedan.glb, coupe.glb y pickup.glb vienen de autitos.obj y los SUV de
  autitos.glb (3ds Max), enderezados y en tamaño real. Cada tarjeta usa el de su carrocería, pintado de
  su color y con las luces del color de su tarjeta. El SUV Flama Hot (014) tiene su propio
  modelo con baúl de techo y llamas.
*/

// Modelos por carrocería: archivo, largo real (m), material de los faros y puntos de las etiquetas
const MODELOS = {
  sedan:  { modelo: "models/sedan.glb",  largoReal: 4.5, faros: "Faros",
            puntos: { techo: "-0.19 1.29 0.00", lado: "0.27 0.47 0.93", decorado: "0.95 0.91 0.00", faro: "1.93 0.48 0.76" } },
  coupe:  { modelo: "models/coupe.glb",  largoReal: 4.3, faros: "Luces",
            puntos: { techo: "-0.52 1.25 0.00", lado: "0.68 0.48 0.87", decorado: "0.73 0.89 0.00", faro: "1.98 0.57 0.66" } },
  pickup: { modelo: "models/pickup.glb", largoReal: 5.3, faros: "Luces",
            puntos: { techo: "0.30 1.59 0.00", lado: "0.66 0.59 1.04", decorado: "1.42 1.13 0.00", faro: "2.37 0.64 0.87" } },
  suv:    { modelo: "models/suv-base.glb", largoReal: 4.4, faros: null,   // en el SUV el material de los faros también pinta las llantas
            puntos: { techo: "-0.40 1.70 0.00", lado: "0.71 1.08 1.06", decorado: "1.04 1.12 0.00", faro: "2.01 0.63 0.72" } },
  suvFlama: { modelo: "models/suv-flama-hot.glb", largoReal: 4.4, faros: null,
            puntos: { techo: "-0.59 2.10 -0.01", lado: "0.71 1.08 1.06", decorado: "-0.01 0.72 1.01", faro: "2.01 0.63 0.72" } }
};
const LUZ = { Naranja: "#FF8C1A", Amarilla: "#FFD43B", Blanca: "#F4F4F4", Verde: "#8EE04F", "Ámbar": "#FFB300" };

// Arma un auto: tipo de carrocería + color + las cuatro etiquetas de la franja roja de la tarjeta
function auto(tipo, d) {
  const m = MODELOS[tipo];
  const colores = Object.assign({}, d.colores || {});
  if (tipo === "suv") colores.Material__418 = d.color;          // capó y techo del mismo color que la carrocería
  if (m.faros && LUZ[d.luces]) colores[m.faros] = LUZ[d.luces];  // faros del color de la tarjeta
  const p = m.puntos;
  return Object.assign({
    modelo: m.modelo, largoReal: m.largoReal, colores,
    personalizacion: [
      { titulo: "Techo",      valor: d.techo,      punto: p.techo,    pantalla: [0.22, 0.17] },
      { titulo: "Carrocería", valor: d.carroceria, punto: p.lado,     pantalla: [0.79, 0.25] },
      { titulo: "Decorado",   valor: d.decorado,   punto: p.decorado, pantalla: [0.17, 0.65], cursiva: true },
      { titulo: "Luces",      valor: d.luces,      punto: p.faro,     pantalla: [0.83, 0.64] }
    ]
  }, d);
}

window.KM48_AUTOS = {
  "001": auto("sedan",  { nombre: "Sedán Drift Clásico",    numero: "001/120", creador: "Fabricio Castillo", color: "#E8850F", carroceria: "Sedán",  decorado: "Cuadriculado",    luces: "Naranja",  techo: "Techo liso" }),
  "002": auto("coupe",  { nombre: "Coupé Plata Boreal",     numero: "002/120", creador: "Ana María Sosa",    color: "#BFC3C8", carroceria: "Coupé",  decorado: "Rayas rojas",     luces: "Amarilla", techo: "Faros retráctiles" }),
  "003": auto("pickup", { nombre: "Pickup Nitro 48",        numero: "003/120", creador: "Lucía Fernández",   color: "#C8327E", carroceria: "Pickup", decorado: "Rayas blancas",   luces: "Naranja",  techo: "Caja de carga" }),
  "004": auto("suv",    { nombre: "SUV Ruta Azul",          numero: "004/120", creador: "Martín Gómez",      color: "#A9ADB3", carroceria: "SUV",    decorado: "Tribal",          luces: "Amarilla", techo: "Barras de techo" }),
  "005": auto("coupe",  { nombre: "Coupé Tormenta Furioso", numero: "005/120", creador: "Sofía Romero",      color: "#E8930F", carroceria: "Coupé",  decorado: "Rayas negras",    luces: "Blanca",   techo: "Antena deportiva" }),
  "006": auto("pickup", { nombre: "Pickup Ónix Total",      numero: "006/120", creador: "Joaquín Herrera",   color: "#B0170C", carroceria: "Pickup", decorado: "Tribal negro",    luces: "Naranja",  techo: "Caja de carga" }),
  "007": auto("suv",    { nombre: "SUV Sombra Clásico",     numero: "007/120", creador: "Valentina Díaz",    color: "#E6E8EA", carroceria: "SUV",    decorado: "Patrulla",        luces: "Amarilla", techo: "Sirena" }),
  "008": auto("sedan",  { nombre: "Sedán Puma Urbano",      numero: "008/120", creador: "Tomás Acosta",      color: "#2AA3D3", carroceria: "Sedán",  decorado: "Zarpazo",         luces: "Verde",    techo: "Techo liso" }),
  "009": auto("sedan",  { nombre: "Sedán Jaguar Salvaje",   numero: "009/120", creador: "Camila Benítez",    color: "#1E8C3A", carroceria: "Sedán",  decorado: "Rayas blancas",   luces: "Verde",    techo: "Barras de techo" }),
  "010": auto("suv",    { nombre: "SUV Cromo Max",          numero: "010/120", creador: "Nicolás Ruiz",      color: "#E8B400", carroceria: "SUV",    decorado: "Taxi",            luces: "Naranja",  techo: "Cartel de taxi" }),
  "011": auto("coupe",  { nombre: "Coupé Noche XL",         numero: "011/120", creador: "Agustina Molina",   color: "#2A2B30", carroceria: "Coupé",  decorado: "Línea roja",      luces: "Ámbar",    techo: "Antena deportiva" }),
  "012": auto("pickup", { nombre: "Pickup Pampa Azul",      numero: "012/120", creador: "Federico Ríos",     color: "#E9EAEC", carroceria: "Pickup", decorado: "Rayas azules",    luces: "Amarilla", techo: "Canasto de techo" }),
  "013": auto("suv",    { nombre: "SUV Ciclón Dorado",      numero: "013/120", creador: "Julieta Peralta",   color: "#2B9ED6", carroceria: "SUV",    decorado: "Raya blanca",     luces: "Verde",    techo: "Canasto de techo" }),
  "014": auto("suvFlama", { nombre: "SUV Flama Hot",        numero: "014/120", creador: "Carlos Tolosa",     color: "#C8140F", carroceria: "SUV",    decorado: "Decal Acalorado", luces: "Ámbar",    techo: "Porta Equipaje" }),
  "015": auto("pickup", { nombre: "Pickup Acero Extremo",   numero: "015/120", creador: "Florencia Ortiz",   color: "#E07A0C", carroceria: "Pickup", decorado: "Raya blanca",     luces: "Naranja",  techo: "Caja de carga" }),
  "016": auto("sedan",  { nombre: "Sedán Cometa Nocturno",  numero: "016/120", creador: "Matías Aguirre",    color: "#D9DCDF", carroceria: "Sedán",  decorado: "Llama tribal",    luces: "Amarilla", techo: "Alerón de techo" }),

  // Tarjeta de prueba anterior (el QR ?auto=025 de las tarjetas de referencia en Figma)
  "025": auto("suvFlama", { nombre: "SUV Flama Hot",        numero: "25/125",  creador: "Carlos Tolosa",     color: "#C8140F", carroceria: "SUV",    decorado: "Decal Acalorado", luces: "Ámbar",    techo: "Porta Equipaje" })
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

// Dorsos de las tarjetas que reconoce la cámara: una versión de cada color (naranja,
// azul, amarilla y roja). Sirve para todas las tarjetas; el QR dice qué auto mostrar.
// Si se cambia el diseño del dorso, hay que volver a generar este archivo.
window.KM48_OBJETIVOS = "targets/todas.mind";

// Auto que se muestra en la computadora si el link no trae ?auto=
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

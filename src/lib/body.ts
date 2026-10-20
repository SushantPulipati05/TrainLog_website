/**
 * The app's body map, as SVG paths on a 100 x 220 grid (the same shapes the
 * Android app draws). Left-side shapes are mirrored to make the right side.
 */

const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_m, x: string, y: string) => `${(100 - parseFloat(x)).toFixed(1)},${y}`);
const both = (d: string) => [d, mirror(d)];

export type Part =
  | "head" | "neck" | "upperChest" | "midChest" | "lowerChest" | "frontDelt" | "sideDelt" | "rearDelt"
  | "biLong" | "biShort" | "brachialis" | "forearms" | "abs" | "obliques"
  | "quadOuter" | "quadFront" | "quadInner" | "adductors" | "shin"
  | "upperTraps" | "midTraps" | "upperBack" | "lats" | "lowerBack"
  | "triLat" | "triLong" | "triMed" | "gluteMed" | "glutes" | "hamOut" | "hamIn" | "calfOut" | "calfIn" | "soleus";

export const NEUTRAL: Part[] = ["head", "neck", "obliques"];

const HEAD = ["M50,4 C57,4 61,9 61,16 C61,23 57,28 50,28 C43,28 39,23 39,16 C39,9 43,4 50,4 Z"];
const NECK = ["M45,27 L55,27 L56,34 L44,34 Z"];
const DELT_IN = both("M31,36 L36,42 C32,45 27,50 24,56 C25,50 26,43 31,36 Z");
const DELT_OUT = both("M31,36 C24,36 19,41 19,49 C19,53 21,56 24,56 C25,50 26,43 31,36 Z");
const FOREARM = both("M17,81 C14,90 12,100 12,110 C14,112 17,112 19,110 C22,101 24,91 25,82 Z");

export const FRONT: [Part, string[]][] = [
  ["head", HEAD],
  ["neck", NECK],
  ["upperChest", both("M49,38 L37,40 C35,41.5 33,43.5 32,46 L49,45.5 Z")],
  ["midChest", both("M49,45.5 L32,46 C30.7,48.5 30,51 30,53.5 L49,53 Z")],
  ["lowerChest", both("M49,53 L30,53.5 C30,54.5 30,55.3 30,56 C34,61 43,62 49,59 Z")],
  ["frontDelt", DELT_IN],
  ["sideDelt", DELT_OUT],
  ["biLong", both("M20,57 C17,63 16,70 17,75 L21.5,74 C21,68 21.5,62 22.5,57 Z")],
  ["biShort", both("M22.5,57 C21.5,62 21,68 21.5,74 L23,77 C24.5,77.5 25.5,77 26,76 C27,69 27,62 25,57 Z")],
  ["brachialis", both("M17,75 C17,76 17,77 17,78 C19,79.5 21.5,79.5 23,77 L21.5,74 Z")],
  ["forearms", FOREARM],
  ["abs", [...both("M42,62 L49.3,62 L49.3,74 L42,74 Z"), ...both("M42,76 L49.3,76 L49.3,88 L42,88 Z"), ...both("M43,90 L49.3,90 L49.3,104 L45,104 Z")]],
  ["obliques", both("M32,62 C34,72 35,84 38,98 L41,98 L41,62 Z")],
  ["quadOuter", both("M37,108 C33,120 32,136 34,152 C35.5,153.5 37,154 38.5,154 C37.5,140 37.5,124 39.5,110 Z")],
  ["quadFront", both("M39.5,110 C37.5,124 37.5,140 38.5,154 C40.5,154.5 42,154 43,152.5 C43.5,146 44.5,140 46.5,136 C44.2,132 44,124 44,111 Z")],
  ["quadInner", both("M43,152.5 C44.5,154 45.5,153.5 46,152 C47.5,145 47.5,140 46.5,136 C44.5,140 43.5,146 43,152.5 Z")],
  ["adductors", both("M44,111 C44,124 44.2,132 46.5,136 C47.5,128 48,120 47,110 Z")],
  ["shin", both("M35,162 C33,172 34,186 37,198 C39,200 42,200 43,197 C45,186 45,172 43,162 Z")],
];

export const BACK: [Part, string[]][] = [
  ["head", HEAD],
  ["neck", NECK],
  ["upperTraps", ["M50,28 L60,34 L66,38 L58,40 L50,38 L42,40 L34,38 L40,34 Z"]],
  ["midTraps", ["M50,38 L58,40 L56,46 L50,52 L44,46 L42,40 Z"]],
  ["rearDelt", DELT_IN],
  ["sideDelt", DELT_OUT],
  ["upperBack", both("M49,52 L44,47 L37,42 C34,46 33,52 35,58 L49,62 Z")],
  ["lats", both("M34,58 C32,66 33,76 37,86 L44,82 L49,64 Z")],
  ["lowerBack", both("M44,84 L49.3,84 L49.3,100 L43,100 Z")],
  ["triLat", both("M20,57 C17,63 16,70 17,76 L21,73 C21.5,67 22,62 23,57 Z")],
  ["triLong", both("M23,57 C22,62 21.5,67 21,73 L24.5,75 C25.3,75.3 25.8,75.6 26,76 C27,69 27,62 25,57 Z")],
  ["triMed", both("M17,76 L17,78 C20,80 24,79 26,76 C25.8,75.6 25.3,75.3 24.5,75 L21,73 Z")],
  ["forearms", FOREARM],
  ["gluteMed", both("M37,98 L43,99.5 L43,102 L38,102 C36.5,103.5 35.5,105 35,107 C34.5,104 35,100.5 37,98 Z")],
  ["glutes", both("M49,102 L38,102 C34,107 34,116 38,121 C42,124 47,123 49,120 Z")],
  ["hamOut", both("M37,124 C34,134 34,144 36,154 C38,155.5 40,156 41,156 C40.5,145 41,134 42,124 Z")],
  ["hamIn", both("M42,124 C41,134 40.5,145 41,156 C43,156 44.5,155.5 46,154 C48,144 48,132 47,124 Z")],
  ["calfOut", both("M35,162 C32,170 32,178 34,184 L39,180 L39,162 Z")],
  ["calfIn", both("M39,162 L39,180 L44,183 C45.5,176 45,169 43,162 Z")],
  ["soleus", both("M34,184 C34.5,188 35,191 36,194 C39,198 42,198 44,194 C44,190 44,186 44,183 L39,180 Z")],
];

import { is_slang, define_word } from "./slang_lib.js";

const words = document.querySelectorAll(
  "h1, h2, h3, h4, h5, p, li, td, caption, span, a"
);
let acronymsAndSlang = ["and"];
export function main() {
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    console.log(word.innerHTML.includes("and"));
    if (word.innerHTML.includes("and")) {
      const text = "and";
      const index = word.innerHTML.indexOf(text);
      if (index >= 0) {
        word.innerHTML =
          word.innerHTML.substring(0, index) +
          "<span class='grace'>" +
          word.innerHTML.substring(index, index + text.length) +
          "<span class='popover'><span><b>Word:</b> rizz</span><span><b>Definition:</b> A word for having an elite amount of game, specifically for getting with girls.</span><span><b>Example:</b> Holly Spragg has impeccable rizz and pulls too many bitches.</span></span></span>" +
          word.innerHTML.substring(index + text.length);
      }
    }
  }
}

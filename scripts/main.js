import { is_slang, define_word } from "./slang_lib.js";

const words = document.querySelectorAll("p");
let acronymsAndSlang = ["and"];
export function main() {
    // TODO: Remove this testing code. Poggers !
    // define_word("poggers").then((data) => {
    //     console.log(`Definition: ${data["definition"]}`);
    //     console.log(`Usage: ${data["usage"]}`);
    // })
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    console.log(word.innerHTML.includes("and"));
    if (word.innerHTML.includes("and")) {
      const text = "and";
      word.innerHTML = word.innerHTML.replaceAll(
        "and",
        "<span class='grace'>" +
          text +
          "<span class='popover'><span><b>Word:</b> rizz</span><span><b>Definition:</b> A word for having an elite amount of game, specifically for getting with girls.</span><span><b>Example:</b> Holly Spragg has impeccable rizz and pulls too many bitches.</span></span></span>"
      );
    }
  }
}

// import { is_slang, define_word } from "./slang_lib.js";

// const words = document.querySelectorAll(
//   "h1, h2, h3, h4, h5, p, li, td, caption, span, a"
// );
// let acronymsAndSlang = ["and"];
// export function main() {
//   for (let i = 0; i < words.length; i++) {
//     let word = words[i];
//     console.log(word.textContent.includes("and"));
//     if (word.textContent.includes("and")) {
//       const text = "and";
//       const index = word.textContent.indexOf(text);
//       if (index >= 0) {
//         const container = document.createElement("span");
//         const word = document.createElement("span");
//         word.innerHTML = "<b>Word:</b> rizz";
//         const wordDefinition = document.createElement("span");
//         wordDefinition.innerHTML =
//           "<b>Definition:</b> A word for having an elite amount of game, specifically for getting with girls.";
//         const wordExample = document.createElement("span");
//         wordExample.innerHTML =
//           "<b>Example:</b> Holly Spragg has impeccable rizz and pulls too many bitches.";
//         container.appendChild(word);
//         container.appendChild(wordDefinition);
//         container.appendChild(wordExample);

//         word.innerHTML =
//           word.innerHTML.substring(0, index) +
//           "<span class='grace'>" +
//           word.innerHTML.substring(index, index + text.length) +
//           "<span class='popover'><span><b>Word:</b> rizz</span><span><b>Definition:</b> A word for having an elite amount of game, specifically for getting with girls.</span><span><b>Example:</b> Holly Spragg has impeccable rizz and pulls too many bitches.</span></span></span>" +
//           word.innerHTML.substring(index + text.length);
//       }
//     }
//   }
// }

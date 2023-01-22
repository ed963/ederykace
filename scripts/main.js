import { is_slang, define_word } from "./slang_lib.js";

const words = document.querySelectorAll("p");

export function main() {
    // TODO: Remove this testing code. Poggers !
    console.log(`sending API call...`);
    define_word("meme").then((data) => {
        console.log(`Definition: ${data["definition"]}`);
        console.log(`Usage: ${data["usage"]}`);
    })
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    console.log(is_slang(word));
    if (is_slang(word)) {
        define_word(word)
            .then((data) => {
                const definition = data["definition"];
                const usage = data["usage"];

                word.innerHTML = word.innerHTML.replaceAll(word,
                    "<span class='grace'>" +
                    word +
                    "<span class='popover'>" + 
                    `<span><b>Word:</b> ${word}</span>` + 
                    `<span><b>Definition: ${definition}</b></span>` +
                    `<span><b>Example:</b> ${usage}</span></span></span>`
                );

            })
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

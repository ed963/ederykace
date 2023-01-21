import "bootstrap/dist/js/bootstrap.min";

const words = document.querySelectorAll(
  "h1, h2, h3, h4, h5, p, li, td, caption, span, a"
);
let acronymsAndSlang = ["and"];

for (let i = 0; i < words.length; i++) {
  let word = words[i];
  console.log(word.innerHTML.includes("and"));
  if (word.innerHTML.includes("and")) {
    const text = "and";
    const index = word.innerHTML.indexOf(text);
    if (index >= 0) {
      word.innerHTML =
        word.innerHTML.substring(0, index) +
        "<span class='grace' data-toggle='popover' data-placement='top' data-trigger='hover' title='Popover title' data-content='And here's some amazing content.'>" +
        word.innerHTML.substring(index, index + text.length) +
        "</span>" +
        word.innerHTML.substring(index + text.length);
    }
  }
}

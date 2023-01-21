let slang_dataset;

const url = chrome.runtime.getURL('data/slang_dataset.json');

fetch(url)
    .then((response) => response.json())
    .then((json) => {slang_dataset = new Set(json); slang_dataset.add("and");}); // Adding "and" to slang database for testing purposes

/**
 * Return whether the given word is a slang word.
 */
function is_slang(word) {
    return word in slang_dataset;
}

/**
 * Return a definition for the given slang word.
 */
function define_word(word) {
    return "Placeholder definition";
}

export {is_slang, define_word};
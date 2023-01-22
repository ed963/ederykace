import { censor } from "./clean.js";

/**
 * Return a promise which resolves into an object mapping slang words
 * to their definitions.
 */
async function load_slang_dataset() {
    const url = chrome.runtime.getURL('data/slang_dataset.json');
    try {
        const response = await fetch(url);
        const json = await response.json();
        json["and"] = "Not a real slang word :>" // Adding "and" to slang database for testing purposes
        return json;
    } catch (e) {
        return console.error(`ERROR: ${e.message}`);
    }
}

/**
 * Return whether the given word is in slang_dataset.
 */
function is_slang(slang_dataset, word) {
    return word.toLowerCase() in slang_dataset;
}

/**
 * Return an array of the slang words in the given text.
 */
function get_slang(slang_dataset, text) {
    let words = text.match(/\b(\w+)\b/g);
    if (words) {
        return words.filter(word => is_slang(slang_dataset, word));
    }
    else {
        return [];
    }
    
}

/**
 * Return a definition and usage example for the given slang word.
 * 
 * The result is given as a promise which resolves into an object 
 * of the following form:
 * {
 *      "definition": <definition>, 
 *      "usage": <usage>
 * }
 */
async function define_word(word) {
    try {
        const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);
        const json = await response.json();
        // console.log(json)
        const definition_promise = call_cohere_api(generate_cohere_definition_prompt(json));
        const usage_promise = call_cohere_api(generate_cohere_usage_prompt(json));
        const generated_text = await Promise.all([definition_promise, usage_promise]);
        return { "definition": generated_text[0].replace("--", " "), "usage": generated_text[1].replace("--", " ") };
    } catch (e) {
        return console.error(`ERROR: ${e.message}`);
    }
}

/**
 * Given raw JSON output from an Urban Dictionary API request, generate a prompt
 * that can be given to the co:here API to generate a definition.
 */
function generate_cohere_definition_prompt(raw) {
    const response_list = raw["list"];

    let prompt = `Define the word ${response_list[0]["word"]} based on these examples: \n`;

    for (let i = 0; i < response_list.length; i++) {
        if (response_list[i]["definition"]){
            prompt += `${response_list[i]["definition"]} \n--\n`
        }
    }
    // console.log(prompt)
    prompt = censor(prompt.replaceAll('[', '').replaceAll(']', ''));
    return prompt;
}

/**
 * Given raw JSON output from an Urban Dictionary API request, generate a prompt
 * that can be given to the co:here API to generate a usage example.
 */
function generate_cohere_usage_prompt(raw) {
    const response_list = raw["list"];
    let prompt = `Use the word ${response_list[0]["word"]} in a full sentence based on these examples:\n`;

    for (let i = 0; i < response_list.length; i++) {
        // if (response_list[i]["definition"] && response_list[i]["example"]){
        //     prompt += `\nDefinition: ${response_list[i]["definition"]} \nExample: ${response_list[i]["example"]}\n--`
        // } else
        if (response_list[i]["example"]){
            prompt += `${response_list[i]["example"]}\n--\n`
        }
    }
    // console.log(prompt)
    prompt = censor(prompt.replaceAll('[', '').replaceAll(']', ''));
    return prompt;
}

/**
 * Call the co:here API with the given prompt, and return a promise
 * that resolves into generated text.
 */
async function call_cohere_api(prompt) {
    let options = {
        "method": "post",
        "headers": {
            "Authorization": "BEARER X6RH1jZEUsCf3cqGZhwW07Fecg8qSODah2qSHBFm",
            "Content-Type": "application/json",
            "Cohere-Version": "2022-12-06"
        },
        "body": JSON.stringify({
            "model": "command-xlarge-nightly",
            "prompt": `${prompt}`,
            "max_tokens": 150,
            "temperature": 0.25,
            "k": 0,
            "p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "stop_sequences": ["--"],
            "return_likelihoods": "NONE"
        })
    };
    
    try {
        const response = await fetch("https://api.cohere.ai/generate", options);
        // console.log(response)
        if (response.status== 498){
            return "The usage examples found were too offensive and could not be computed"
        }
        const json = await response.json();
        return json["generations"][0]["text"];
    } catch (e) {
        return console.error(`ERROR: ${e.message}`);
    }
}

export {load_slang_dataset, get_slang, define_word};
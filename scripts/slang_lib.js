import { censor } from "./clean.js";

let slang_dataset;


const url = chrome.runtime.getURL('data/slang_dataset.json');

fetch(url)
    .then((response) => response.json())
    .then((json) => {slang_dataset = new Set(json); slang_dataset.add("and");}) // Adding "and" to slang database for testing purposes
    .catch((e) => console.error(`ERROR: ${e.message}`));

/**
 * Return whether the given word is a slang word.
 */
function is_slang(word) {
    return word in slang_dataset;
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
        return { "definition": generated_text[0], "usage": generated_text[1] };
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
    // prompt = prompt.replaceAll('[', '').replaceAll(']', '');
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
        const json = await response.json();
        return json["generations"][0]["text"];
    } catch (e) {
        return console.error(`ERROR: ${e.message}`);
    }
}

export {is_slang, define_word};
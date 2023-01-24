# s(lang)

A simple, elegant Chrome browser extension for displaying definitions of acronyms, slang, regional words.

## Setup

1. Clone the git repo

```
git clone https://github.com/ed963/ederykace.git
```

2. Install `prettier` for prettier code :)

```
npm install
```

3. Load the extension into your Chrome browser. Check out the [Chrome extensions docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) for more details.

4. `s(lang)` will now automatically highlight acronyms and slang found on the page.

5. To see a definition and example usage, simply hover over the highlighted word.

![Definition example](/images/example.png)

## Inspiration

One of our group members did not like Googling slang terms and acronyms in her workplace all the time so this inspired us to build an application to solve this problem. 

## What it does

Our Chrome browser extension identifies slang and acronyms on the body of the page, and provides definitions and usage examples.

## How we built it

We made extensive use of the Chrome extensions API. We also used the Urban Dictionary API to search for definitions of slang words, and the Co:here API to combine and synthesize the definitions into one concise and all-encompassing definition.

The front-end was designed using HTML, CSS, and JS.

## Challenges we ran into

1. Since we created a Chrome browser extension, we did not have access to the node.js runtime environment. Thus, we could not use Co:here's node.js SDK. In order to access the Co:here API, we had to compose HTTP POST requests, and parse the outputs.

2. Prompt-optimization for the Co:here API, to generate a definition in the format that we wanted. At first, we were generating the definitions and usage examples all at once. However, we soon found that Co:here generated more accurate outputs if we generated them separately.

3. We faced some challenges in editing the DOM to insert the definition pop-ups. Sometimes it would replace elements that we intend for. However, parsing the elements more carefully negatively affected performance.

## Accomplishments that we're proud of

1. Simple and elegant front-end design.
2. Back-end utilizes two APIs.
3. Fully functioning Chrome browser extension -- at least 75% of the time that is :)

## What we learned

1. How to use the Chrome API to create a chrome extension that users can interact with.
2. JavaScript promises
3. Prompt optimization with the Co:here API

## What's next for S(lang)

1. Identification of regional specific slang words.
2. Using NLP to analyze the context for words with multiple defintions. E.g., HR for hour and human relations, CD for change directory and compact disk.
3. Fun extensions may including having users to be able to save and view slang words they like, and also suggest slang words instead of the words used.

## Acknowledgements

s(lang) makes use of the Internet Slang Dataset, which contains over 7500 common acronyms and slang words along with their definitions. 

The dataset has been made publically available by Hitanshu Tiwari, and is available for download on his website: [https://floatcode.wordpress.com/2015/11/28/internet-slang-dataset/](https://floatcode.wordpress.com/2015/11/28/internet-slang-dataset/)

---

<3
By Derek Yi, Edwin Jiang, Eryka Shi-Shun, Grace Leung

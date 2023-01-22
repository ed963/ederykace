
function offensiveWords(){
    return `fuck
shit
cock
titties
boner
muff
pussy
asshole
cunt
ass
cockfoam
nigger
arse
arsehead
arsehole
ass
asshole
bastard
bitch
bloody
bollocks
brotherfucker
bugger
bullshit
child-fucker
Christ on a bike
Christ on a cracker
cock
cock
cocksucker
crap
cunt
damn
damn it
dick
dickhead
dyke
faggot
fatherfucker
frigger
goddamn
godsdamn
hell
kike
motherfucker
nigga
nigra
piss
prick
pussy
shit
shite
sisterfucker
slut
spastic
sweet Jesus
turd
twat
wanker
whore`.split("\n")
}


function isVowel(c) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
} 

function censorFirstVowel(word){
    for(let i =0; i < word.length; i ++){
        if(isVowel(word[i])){
            return word.replace(word[i], "*")
        }
    }
    return word
    
}



function censor(text){
    let offensiveWordsList = offensiveWords()
    // newText = text.strip()
    let newText = text.replace("\r", " ").replace("\n", " ").replace("\r\n", " ");
    let textList = newText.split(" ")
    // console.log(textList)
    for(let i = 0; i < offensiveWordsList.length; i++){
        while(textList.includes(offensiveWordsList[i])){
            // console.log(textList)
            let wordIndex = newText.search(offensiveWordsList[i])
            // console.log(wordIndex)
            newText = newText.substring(0,wordIndex) + censorFirstVowel(newText.substring(wordIndex))
            textList = newText.split(" ")
        }
        
    }
    return newText
    
}


export {censor};
// clean(`
// Word: rizz
// Definition: Another word for spitting game/how good you are with pulling and sustaining bitches.
// Example: Person 1: are you from Tennessee cuz u the only ten i see ;)
// Person watching from a far:Damn, that nigga has no rizz
// `)


OFFENSIVE_WORDS = `fuck
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
son of a bitch
son of a whore
spastic
sweet Jesus
turd
twat
wanker`



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

function offensiveWords(){
    return OFFENSIVE_WORDS.split("\n")
}

function clean(text){
    offensiveWords = offensiveWords()
    
    // newText = text.strip()
    newText = text.replace(/(\r\n|\n|\r)/gm, "");
    textList = newText.split(" ")
    for(let i = 0; i < offensiveWords.length; i++){
        while(textList.includes(offensiveWords[i])){
            console.log(textList)
            wordIndex = newText.search(offensiveWords[i])
            console.log(wordIndex)
            newText = newText.substring(0,wordIndex) + censorFirstVowel(newText.substring(wordIndex))
            textList = newText.split(" ")
        }
        
    }
    console.log(newText)
    return newText
    
}



clean(`
Word: rizz
Definition: Another word for spitting game/how good you are with pulling and sustaining bitches.
Example: Person 1: are you from Tennessee cuz u the only ten i see ;)
Person watching from a far:Damn, that nigga has no rizz
`)
"""
Python script for getting definitions and examples from Urban Dictionary API.

Usage: 
    python3 query.py <search_term>

Example:
$ python3 query.py rizz
Word: rizz
Definition: A word for having an elite amount of game, specifically for getting with girls.
Example: "Holly Spragg has impeccable rizz and pulls too many bitches".
--
Word: rizz
Definition: a term used for cocaine
Example: "You wanna do some rizz?"
--
...
"""

import urllib.request, sys, json

if __name__ == '__main__':
    search_term = sys.argv[1]

    response = urllib.request.urlopen(f"https://api.urbandictionary.com/v0/define?term={search_term}").read()
    response_list = json.loads(response)["list"]
    
    for entry in response_list:
        entry["definition"] = entry["definition"] if "definition" in entry else ""
        entry["definition"] = entry["definition"].replace("[", "")
        entry["definition"] = entry["definition"].replace("]", "")
       
        entry["example"] = entry["example"] if "example" in entry else ""
        entry["example"] = entry["example"].replace("[", "")
        entry["example"] = entry["example"].replace("]", "")

        print(f"Word: {search_term}")
        print(f"Definition: {entry['definition']}")
        print(f"Example: {entry['example']}")
        print("--")

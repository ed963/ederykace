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

        print(f"Definition: {entry['definition']}")
        print(f"Example: {entry['example']}")
        print("--")

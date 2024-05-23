# Dieser simple pythonscript überprüft ob du du Abenteuer doppelt eingetragen hast in der Datei data/map_loader.json
import json

# Ersetze dies mit dem Inhalt deiner JSON-Datei aus der data/map_loader.json datei
data = [
    # Dein JSON-Inhalt hier
]

# Überprüfung auf Duplikate
seen = set()
duplicates = []

for item in data:
    identifier = (item['at_loader_name], item['at_img'])
    if identifier in seen:
        duplicates.append(item)
    else:
        seen.add(identifier)

print("Duplikate:", duplicates)

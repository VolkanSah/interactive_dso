import json

# Ersetze dies mit dem Inhalt deiner JSON-Datei
data = [
    # Dein JSON-Inhalt hier
]

# Überprüfung auf Duplikate
seen = set()
duplicates = []

for item in data:
    identifier = (item['Abenteuer'], item['Zuordnung'], item['Level'])
    if identifier in seen:
        duplicates.append(item)
    else:
        seen.add(identifier)

print("Duplikate:", duplicates)

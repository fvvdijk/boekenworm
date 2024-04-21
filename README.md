# Boekenworm

# Inhoud:
1. [Benodigdheden]
2. [Installatie] 
3. [Gebruik]
4. [Beschikbare scripts]
5. [Inloggegevens]

Boekenworm is een webapplicatie die boekenliefhebbers helpt bij het ontdekken van boeken op basis van hun persoonlijkheid en interesse. 
Door middel van een intuïtieve quiz worden gebruikers begeleid bij het bepalen van hun voorkeuren, 
waarna de applicatie relevante boekaanbevelingen geeft.

## Benodigdheden

Om de Boekenworm-applicatie lokaal te kunnen uitvoeren, heb je het volgende nodig:

- Node.js en npm geïnstalleerd op je computer.
- De backend server is https://novi.datavortex.nl/ en de api key is: "boekenworm:byfOaBewbNje38gcGoHw"

## Installatie

Volg deze stappen om de Boekenworm-applicatie lokaal te installeren en uit te voeren:

1. Clone het project: `git clone https://github.com/fvvdijk/boekenworm.git`
2. Navigeer naar de projectmap: `cd boekenworm`
3. Installeer de afhankelijkheden: `npm install`

## Gebruik

1. Start de ontwikkelserver: `npm start`
2. Open de applicatie in je webbrowser: [http://localhost:3000]
3. Wanneer je de functie 'Extra info' wilt gebruiken, klik dan op de button 'Corsdemo', 
dan word je geleid naar https://cors-anywhere.herokuapp.com/corsdemo waar je kunt klikken op
'Request temporary acces to the demo server', zodat de data verkregen kan worden door de axios request.
Nu kun je zonder problemen extra info verkrijgen over een boek.

### Beschikbare scripts

- `npm start`: Start de ontwikkelserver.
- `npm build`: Bouwt de applicatie voor productie.

## Inloggegevens

Je kunt inloggen met de volgende gegevens:

- Gebruikersnaam: Testuser123
- Wachtwoord: Hello123

# Discover Sri Lanka: Interactive Travel Map

An interactive guide to 39 of Sri Lanka's best places to visit, from ancient cities and cave temples to surf beaches, safari parks and the misty hill country.

Built with **React 19, Vite, Tailwind CSS, Leaflet and Framer Motion**.

## Features

- **Interactive map.** Colour-coded pins on an OpenStreetMap base map. Click a pin for a quick preview.
- **Search and filters.** Search by name, region or activity, and filter by category (Heritage, Beaches, Wildlife, Hills & Nature, Cities & Culture).
- **"Travelling in…" filter.** Pick a month to show only the places that are in season then. Sri Lanka has two monsoons, so it's always the season somewhere.
- **Place details.** Highlights, a 12-month "best time to visit" strip, suggested time, directions in Google Maps and a link to Wikipedia.
- **Saved places.** Tap the heart to save a place. Saved places are stored in your browser and persist across visits.
- **Responsive and accessible.** Works on mobile. The details dialog supports the keyboard (Esc to close, focus moves into the dialog).

## Getting started

```bash
cd sri-lanka-tourism
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint
```

## Project structure

```
sri-lanka-tourism/src/
├── App.jsx                 # page layout, filter state, modal
├── data/places.js          # the 39 destinations + categories + month helper
├── hooks/
│   ├── usePlaces.js        # bundled data, optional Firestore source
│   └── useFavorites.js     # saved places (localStorage)
├── components/
│   ├── heroMap.jsx         # hero header + nav
│   ├── exploreMap.jsx      # Leaflet map, pins, popups
│   ├── filters.jsx         # search, category chips, month picker
│   ├── placecard.jsx       # destination card
│   ├── placeModal.jsx      # destination details dialog
│   ├── placeImage.jsx      # photo with graceful fallback
│   └── travelTips.jsx      # seasons + practical tips
└── config/firebase.js      # only loaded when Firestore is enabled
```

## Adding or editing places

Edit `src/data/places.js`. Each place looks like this:

```js
{
  id: 'sigiriya',
  name: 'Sigiriya Rock Fortress',
  category: 'heritage',            // heritage | beach | wildlife | hills | city
  region: 'Central Province',
  lat: 7.9569, lng: 80.7597,
  unesco: true,
  image: commons('e/e6/Sigiriya_%28141688197%29.jpeg'), // Wikimedia Commons path
  wiki: 'https://en.wikipedia.org/wiki/Sigiriya',
  shortDescription: '…',
  description: '…',
  highlights: ['…', '…', '…'],
  months: [2, 3, 4, 5, 6, 7, 8, 9], // best months, 1 = January
  duration: 'Half day',
}
```

## Optional: load places from Firestore

By default the app uses the bundled data and doesn't need a backend. To load places from a Firestore `places` collection instead:

1. Copy `sri-lanka-tourism/.env.example` to `sri-lanka-tourism/.env`.
2. Fill in your Firebase config and set `VITE_USE_FIRESTORE=true`.

Documents should use the same fields as above. The older `latitude`, `longitude` and `fullDescription` names are also accepted. If the collection is empty or can't be reached, the app falls back to the bundled data.

## Credits

- Photos: [Wikimedia Commons](https://commons.wikimedia.org/) contributors (see each place's Wikipedia article for licence details)
- Map data: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

# First Bank Mobile Money

A responsive, dependency-free landing page for a First Bank Mobile Money experience. The page presents core mobile banking features, provides a searchable branch directory, and directs visitors toward app downloads and customer support.

## Features

- FirstBank-inspired blue and gold visual theme
- Responsive layout for desktop and mobile screens
- Hero section with mobile banking call to action
- Feature overview for transfers, bill payments, and secure access
- Searchable and filterable branch directory
- Branch detail panel with address, hours, phone number, and actions
- Google Maps directions link generated from branch coordinates
- Contact Branch action using the visitor's default email client
- Mobile navigation toggle
- Automatically updated copyright year

## Project Structure

```text
.
├── index.html    # Page structure and content
├── styles.css    # Layout, responsive rules, and brand styling
├── script.js     # Branch data and client-side interactions
├── README.md     # Project documentation
└── LICENSE       # Project license
```

## Run Locally

No build step or package installation is required.

1. Open `index.html` directly in a browser, or serve the folder with any local static web server.
2. Use the navigation links to move between features, branches, and download sections.
3. Search for a branch by name, city, or address, or select one from the branch dropdown.
4. Select a branch card to view its details and available actions.

For example, with Python installed:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Branch Data

The directory currently uses three sample branches defined in `script.js`:

- First Bank - Lagos Island
- First Bank - Ikeja
- First Bank - Abuja Central

Replace `sampleBranches` with data from a trusted backend or approved branch-data source before production use. The current phone numbers, coordinates, support email, and app download buttons are placeholders.

## Brand Styling

The visual theme uses:

- Deep blue: `#003b70`
- Dark blue: `#00264d`
- Gold: `#fdb913`
- Light blue surface: `#f4f8fb`

These colors are implemented as CSS custom properties in `styles.css`, making them straightforward to update as official brand guidance changes.

## Production Notes

- Connect the Android and iOS buttons to the approved app-store listings.
- Replace the map placeholder with an approved map provider integration if an interactive map is required.
- Replace sample branch and support contact details with verified information.
- Confirm all logos, colors, copy, and contact details against current FirstBank brand and legal guidelines.
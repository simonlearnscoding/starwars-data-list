# STAR WARS DATA TABLE

A one-page Star Wars explorer application built with React, TypeScript, Redux, and Vite. This project displays a list of people fetched from the Star Wars API and shows details about their related planet in a modal popup.

## Overview

This application is designed to allow users to view a grid-table of Star Wars characters along with their details (name, height, mass, created date, edited date, and a link to their planet). When a user clicks on the planet link, a modal popup appears with further details about the planet (name, diameter, climate, and population). Filtering by name is also supported.

## Features

- **Grid-Table Display:** List of people with details.
- **Planet Modal:** Click a planet link to view more information.
- **Filtering:** Search functionality to filter people by name.
- **State Management:** Global state managed via Redux.
- **Routing:** Uses React Router for navigation.
- **UI:** Designed with Tailwind CSS
- **Testing:** End-to-end tests written with Cypress and unit tests with Vitest.

## Tech Stack

- **Framework:** React.js (with TypeScript)
- **State Management:** Redux Toolkit & React Redux
- **Routing:** React Router
- **HTTP Client:** Redaxios
- **Styling:** Tailwind CSS
- **Icons:** Phosphor Icons
- **Build Tool:** Vite
- **Testing:** Cypress, Vitest

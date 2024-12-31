# LandVer - Land Verification System

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](https://github.com/NoshonNetworks/landver/graphs/contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[LandVer](https://landver.net/) is a decentralized land registration and verification protocol, utilizing blockchain technology to provide a secure, transparent, and immutable system for managing land records. The protocol facilitates land transactions and ownership verification on the Starknet blockchain.

While initially built on Starknet, LandVer is designed to be cross-chain compatible, allowing land transactions and records to be securely managed across multiple blockchains. LandVer is one of the many products of Noshon Networks, which aims to bring innovation to the world of real estate.

## Project Structure

The monorepo is organized into the following components:

- `app/`: Contains the main application code:

* Frontend client application
* Backend server implementation

- `docs/`: Project documentation, including setup guides and API references
- `land-registry-backend/`: Core backend service for land registry operations
- `land-registry-indexer/`: Blockchain indexer service for tracking land registry events
- `land_registry/`: Smart contract implementation for the land registry system
- `landing_page/`: Website and landing page
- `scripts/`: Utility scripts for development and deployment
- `sdk/`: JavaScript SDK for interacting with LandVer protocols
- `tools/`: Development and maintenance tools
- `.github/`: GitHub workflows and configuration files


### Prerequisites

Before you begin, ensure you have the following installed. 

- [scarb](https://docs.swmansion.com/scarb/docs.html): Smart contract development tool

- [snfoundry](https://book.getfoundry.sh/getting-started/installation): Smart contract testing framework
- [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): JavaScript runtime and package manager
- [install rust](https://www.rust-lang.org/tools/install): Required for some development tools


# Development Setup
 
Steps to build and run LandVer locally.

## How to Run the Code

### Running the Client and Server

 Navigate to the client directory, install the packages, and start the client
```bash 
cd app/client
 pnpm install 
 pnpm start
```
 In a separate terminal, navigate to the server directory, install the packages, and start the server

```bash
cd app/server
npm install
npm run dev
```


### Running the Land Registry Contracts

 Navigate to the land_registry directory, build the contracts

```bash
cd land_registry
scarb build
```
 To run tests on the contract

```bash
cd land_registry
scarb test
```

### Backend Services

Start the land registry backend:

```bash
cd land-registry-backend
npm install
npm run dev
```

### Start the indexer service:

```bash
cd land-registry-indexer
npm install
npm start
```

### Build for production:

```bash
npm run build
```

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fishonsnote.medium.com/"><img src="https://avatars.githubusercontent.com/u/43862685?v=4?s=100" width="100px;" alt="Fishon Amos"/><br /><sub><b>Fishon Amos</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=fishonamos" title="Code">💻</a> <a href="https://github.com/NoshonNetworks/landver/pulls?q=is%3Apr+reviewed-by%3Afishonamos" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Solomonsolomonsolomon"><img src="https://avatars.githubusercontent.com/u/103282647?v=4?s=100" width="100px;" alt="Solomonsolomonsolomon"/><br /><sub><b>Solomonsolomonsolomon</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Solomonsolomonsolomon" title="Code">💻</a> <a href="#infra-Solomonsolomonsolomon" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GoSTEAN"><img src="https://avatars.githubusercontent.com/u/63151237?v=4?s=100" width="100px;" alt="Stephanie Nwankwo"/><br /><sub><b>Stephanie Nwankwo</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=GoSTEAN" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rajiabdul"><img src="https://avatars.githubusercontent.com/u/119139404?v=4?s=100" width="100px;" alt="RAJI ABDUL"/><br /><sub><b>RAJI ABDUL</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=rajiabdul" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/manlikeHB"><img src="https://avatars.githubusercontent.com/u/109147010?v=4?s=100" width="100px;" alt="Yusuf Habib"/><br /><sub><b>Yusuf Habib</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=manlikeHB" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Akshola00"><img src="https://avatars.githubusercontent.com/u/114211385?v=4?s=100" width="100px;" alt="Akinshola"/><br /><sub><b>Akinshola</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Akshola00" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SoarinSkySagar"><img src="https://avatars.githubusercontent.com/u/117727361?v=4?s=100" width="100px;" alt="Sagar Rana"/><br /><sub><b>Sagar Rana</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=SoarinSkySagar" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/saimeunt"><img src="https://avatars.githubusercontent.com/u/5597359?v=4?s=100" width="100px;" alt="saimeunt"/><br /><sub><b>saimeunt</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=saimeunt" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://deveche.vercel.app/"><img src="https://avatars.githubusercontent.com/u/111073744?v=4?s=100" width="100px;" alt="Echefula Ndukwe"/><br /><sub><b>Echefula Ndukwe</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Eche5" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://poulav.vercel.app"><img src="https://avatars.githubusercontent.com/u/133862694?v=4?s=100" width="100px;" alt="Poulav Bhowmick"/><br /><sub><b>Poulav Bhowmick</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=PoulavBhowmick03" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/No-bodyq"><img src="https://avatars.githubusercontent.com/u/141028690?v=4?s=100" width="100px;" alt="Asher"/><br /><sub><b>Asher</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=No-bodyq" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Villarley"><img src="https://avatars.githubusercontent.com/u/115122095?v=4?s=100" width="100px;" alt="Santiago Villarreal Arley"/><br /><sub><b>Santiago Villarreal Arley</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Villarley" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Otaiki1"><img src="https://avatars.githubusercontent.com/u/38711713?v=4?s=100" width="100px;" alt="Abdulsamad sadiq"/><br /><sub><b>Abdulsamad sadiq</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Otaiki1" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Calebux"><img src="https://avatars.githubusercontent.com/u/119738245?v=4?s=100" width="100px;" alt="Caleb "/><br /><sub><b>Caleb </b></sub></a><br /><a href="#design-Calebux" title="Design">🎨</a> <a href="https://github.com/NoshonNetworks/landver/commits?author=Calebux" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Oshioke-Salaki"><img src="https://avatars.githubusercontent.com/u/105825121?v=4?s=100" width="100px;" alt="Oshioke Salaki"/><br /><sub><b>Oshioke Salaki</b></sub></a><br /><a href="https://github.com/NoshonNetworks/landver/commits?author=Oshioke-Salaki" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

</a>

## License

This project is licensed under the MIT License. See `LICENSE.txt` for more information.

## Contact

X-profile - [@Landver](https://x.com/landver0) -

Github: [Landver](https://github.com/NoshonNetworks/landver)

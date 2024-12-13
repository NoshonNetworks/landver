# LandVer - Land Verification System

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

LandVer is a decentralized land registration and verification protocol, utilizing blockchain technology to provide a secure, transparent, and immutable system for managing land records. The protocol facilitates land transactions and ownership verification across multiple blockchains, beginning with Starknet.

While initially built on Starknet, LandVer is designed to be cross-chain compatible, allowing land transactions and records to be securely managed across multiple blockchains. LandVer is one of the many products of Noshon Networks, which aims to bring innovation to the world of real estate.

## Project Structure

The project is divided into the following components:

- `land-registry-backend/`: Node.js and Express-based API server
- `docs/`: Documentation for the project, including setup guides and API references
- `examples/`: React-based web application
- `land_registry/`: Land registry contract
- `public/`: Public assets and resources
- `scripts/`: JavaScript tools for automation and utility tasks
- `sdk/`: JavaScript for interacting with the smart contracts and API


# Development
 
Steps to build and run LandVer locally.

### Prerequisites

Ensure you have the prerequisites installed before proceeding. 

[scarb](https://docs.swmansion.com/scarb/docs.html)
[snfoundry](https://book.getfoundry.sh/getting-started/installation)
[install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
[install rust](https://www.rust-lang.org/tools/install)




## How to Run the Code

### Running the Client and Server

 Navigate to the client directory, install the packages, and start the client
```bash 
cd app/client
 npm install 
 npm start
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

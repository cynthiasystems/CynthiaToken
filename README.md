# CynthiaToken ($CYNTHIA)

This repository contains the smart contract for the `$CYNTHIA` token, the native cryptocurrency powering Cynthia Systems' AI-driven search services. `$CYNTHIA` is an ERC-20 compliant token deployed on the Ethereum blockchain.

![CynthiaToken](docs/CynthiaToken.png)

## Overview

The `$CYNTHIA` token is designed with a fixed supply of 100 million tokens, providing a predictable and transparent tokenomics model for our ecosystem. This repository includes the Solidity smart contract, deployment scripts, and a comprehensive test suite.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/CynthiaSystems/CynthiaToken.git
cd CynthiaToken
```

2. Install dependencies:

```bash
npm install
```

### Testing

Run the test suite:

```bash
npx hardhat test
```

### Deployment

To deploy the contract to a network:

1. Set up your environment variables (see `.env.example`).
2. Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Security

This contract has not been audited. Use at your own risk.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to us at [cynthia@cynthiasystems.com](mailto:contact@cynthiasystems.com).


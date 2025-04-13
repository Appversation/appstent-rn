# Appstent RN

A React Native library for CMS-driven rendering engine that generates React Native views from remote JSON content.

## Project Structure

```
.
├── packages/
│   └── appstent-rn-framework/  # Core library package
├── example/                    # Example Expo app
└── package.json               # Root package.json for monorepo
```

## Features

- CMS-driven view generation from JSON
- Expo-compatible
- TypeScript support
- Monorepo structure for easy development and testing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/appstent-rn.git
cd appstent-rn
```

2. Install dependencies:
```bash
yarn install
```

3. Start the example app:
```bash
cd example
yarn start
```

## Development

### Working with the Library

The core library is located in `packages/appstent-rn-framework`. To make changes:

1. Navigate to the package:
```bash
cd packages/appstent-rn-framework
```

2. Make your changes and test them in the example app.

### Testing

Run tests using:
```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
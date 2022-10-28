# Paradox projet

![App mobile](./images/admin_screen.PNG)

## About

Monorepo consists of a mobile application, a database, an api and a desktop web application

It uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 46
  |   ├─ React Native using React 18
  |   ├─ Tailwind using Nativewind
  |   └─ Typesafe API calls using tRPC
  └─ next.js
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Git clone the project

```
git@github.com:henribruvier/paradox.git
```

### Setup dependencies

```diff
# Install dependencies
pnpm i

# Create a `.env` for prisma and make sure it's synced
packages
 ├─ api
 └─ db
     └─ .env

# Env content (not secured but for study purpouse) :
DATABASE_URL='mysql://07ufohirpzgfuh623u2d:pscale_pw_Wcmm9D5xdR5E76GaQaB3Xl8QkxypxvpVSk5uecaVVtX@eu-central.connect.psdb.cloud/paradox-db?sslaccept=strict'

```

### Configure Expo `dev`-script

> **Note:** If you want to use a physical phone with Expo Go, just run `pnpm dev` and scan the QR-code.

The easiest way is to download expo-go on your phone, run the command pnpm dev in the expo folder and scan the qr code

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the iOS simulator.

```diff
+  "dev": "expo start --ios",
```

3. Run `pnpm dev` at the project root folder.

#### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

```diff
+  "dev": "expo start --android",
```

3. Run `pnpm dev` at the project root folder.

### For Web and desktop

To launch the project localy, navigate to the apps/nextjs folder and run "pnpm dev"

You can also see a deployed version of the application at: [paradow-web](https://paradox-sand.vercel.app)

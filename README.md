# FuelMate

Vue 3 and Cordova Application.

## Setup

This project uses vscode devcontainer for development, the custom image includes pnpm, node, typescript, java and android sdk.

## Scripts

### Install dependencies

```
pnpm install
```

This command will install vue 3 app and cordova dependencies.

### Vite Dev Server

```
pnpm dev --host
```

This command will run the vite development server

### Cordova Run

```
pnpm cordova:run browser

or

pnpm cordova:run android
```

Build the vue 3 application in development mode and runs the specified platform

### Cordova Build

```
pnpm cordova:build
```

Builds the vue 3 application and builds cordova platforms (browser and android)

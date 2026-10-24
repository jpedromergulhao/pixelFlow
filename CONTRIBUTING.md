# Contributing to PixelFlow

Thank you for your interest in contributing to PixelFlow! This document details the project's architecture and the required workflow to run the environment locally.

## Repository Architecture

This project uses a **Monorepo** pattern with **NPM Workspaces**. All code is consolidated in a single repository but published to NPM as three independent scoped packages (`@jpmergulhao/pixelflow-*`).

The project adopts a hybrid build approach to extract maximum performance from each package:
- **`packages/client`**: Uses `tsup` to bundle Vanilla JS functions and React components into `ESM` and `CJS` formats.
- **`packages/server`**: Uses `tsup` to bundle Node.js routines and CAPI communication.
- **`packages/types`**: Strictly uses `tsc` (the official TypeScript Compiler) with the `emitDeclarationOnly` flag to generate `.d.ts` contracts without emitting JavaScript. This serves as the universal source of truth for both Frontend and Backend.

## Local Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jpmergulhao/pixelflow.git
   cd pixelflow
   ```

2. **Root Installation (Mandatory):**
   Due to the use of Workspaces, you must ALWAYS run the installation at the root of the project. Never run `npm install` inside individual package folders.
   ```bash
   npm install
   ```

3. **Building the project:**
   To test if your changes break the code, run the orchestrated build command at the root. It will compile all three packages in the correct order:
   ```bash
   npm run build
   ```

## Commit Convention

We strictly follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

Each commit message consists of a type, a scope (optional), and a subject:
`<type>(<scope>): <subject>`

**Allowed Types:**
- `feat`: A new feature (e.g., adding a new tracking event)
- `fix`: A bug fix (e.g., resolving a payload issue)
- `docs`: Documentation only changes (e.g., updating the README)
- `style`: Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature (e.g., performance optimizations)
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries (e.g., updating dependencies)

**Examples:**
- `feat(client): add trackRemoveFromCart event`
- `fix(types): enforce Currency type on BaseCommerceEvent`
- `docs: update setup instructions in README`

## Pull Request (PR) Guidelines

- Create a branch from `main` using the format `feature/feature-name`, `fix/bug-name`, or `docs/doc-name`.
- Keep the scope of the PR focused. If you add a new tracking platform, include its types in the `types` package and its logic in the `client` or `server` package within the same PR.
- Ensure there are no typing or compilation errors by running `npm run build` locally before pushing.
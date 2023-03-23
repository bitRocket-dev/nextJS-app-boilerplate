

## Getting Started

First, run the development server:
```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Specifications

The development of the project follows a _functional oriented_ approach. All components are considered _dumb_, meaning they do not contain any logic, while the logic is handled within _custom hooks_.


## Components

- A _shared_ component is developed by aggregating one or more _UI_ components and _custom hooks_.
- The _UI_ component represents the graphical library and therefore has no logic
- The development of a component **should not exceed 90-100 lines of code**.

**Each component/function is exported individually.**

## Code Formatting

Code formatting and checks are designed to ensure maximum quality and uniformity within the codebase.

**During the commit phase, an automatic script is executed that formats the entire codebase according to the Prettier configuration defined within the code. Subsequently, in the event that there are TypeScript errors or the commit does not follow the formatting standard defined (see [Git Flow](@docs/GIT_FLOW.md)), an additional script will deny the commit.**

## Versioning and Changelog

The versioning of the project is automatically calculated from the commit messages that follow the specification of [Git Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

To update the version and changelog, run the command:

```sh
yarn generate:release
```

### Configurazione VSCode

1. Install `Prettier` extension
2. Go to to `File -> Settings` and search `theme`
3. Click on `Edit in settings.json`
4. Add this entry on opened file `settings.json` and save it

1.Install the `Prettier`  extension.
2.Go to `File -> Settings` and search for `theme`.
3.Click on Edit in settings.json`
4.Add this entry to the opened settings.json file and save it:

```
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
    "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  
```

## Work flow

- The package manager used is YARN **- not using npm -**
- Installing a new library requires permission from the Team Lead.
- Changing formatting rules requires permission from the Team Lead.
- Updating a library requires permission from the Team Lead.


# Naming conventions

To facilitate development, it is important that component and/or function names follow the following rules of [Naming Convention](@docs/NAMING_CONVENTION.md)

## Scripts utili

- `yarn run clean` clears the cache
- `yarn run postinstall` activates husky after installing _node_modules_ _(automatic)_
- `yarn run format` code formatting according to defined rules
- `yarn run start` starting the application in staging environment
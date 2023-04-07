/** @format */

module.exports = {
  // Type check TypeScript files
  // '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': filenames => ['nx run-many --all --target=lint'],
  // Prettify only Markdown and JSON files
  // '**/*.(md|json)': filenames => `yarn format  ${filenames.join(' ')}`,
};

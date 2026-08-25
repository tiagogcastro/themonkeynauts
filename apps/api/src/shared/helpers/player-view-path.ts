import path from 'node:path';

/**
 * Resolves a handlebars view file from the project root.
 * Bundled builds change __dirname, so views must be resolved relative to cwd.
 */
export const playerViewPath = (file: string): string =>
  path.resolve(process.cwd(), 'src', 'modules', 'players', 'infra', 'views', file);

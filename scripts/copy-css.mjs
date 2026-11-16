import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await copyFile('src/styles/theme.css', 'dist/styles.css');
await copyFile('src/styles/fonts.css', 'dist/fonts.css');

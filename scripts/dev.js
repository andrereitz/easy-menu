import * as esbuild from 'esbuild';
import { createBuildSettings } from './esbuild.settings.js';

const settings = createBuildSettings({ sourcemap: 'external' });

await esbuild.context(settings)
  .then((r) => {
    console.log('✨ Build succeeded.');

    r.watch();
    console.log('watching...');
  })
  .catch(() => process.exit(1));
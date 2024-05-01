import * as esbuild from 'esbuild';
import { createBuildSettings } from './esbuild.settings.js';

const settings = createBuildSettings({ minify: true });
await esbuild.build(settings).catch(() => process.exit(1));
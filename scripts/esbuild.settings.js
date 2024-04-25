export function createBuildSettings(options) {
  return {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: 'static/js/bundle.js',
    platform: 'browser',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    ...options
  };
}
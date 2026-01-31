#!/usr/bin/env bun
/**
 * Generates barrel exports for methods directory.
 * Supports nested structure: methods/stitch/, methods/project/, methods/screen/
 * Run: bun scripts/generate-barrels.ts
 */

import { readdirSync, writeFileSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const METHODS_DIR = 'core/src/methods';
const OUTPUT_FILE = join(METHODS_DIR, 'index.ts');

interface MethodInfo {
  domain: string;
  name: string;
  pascalName: string;
}

// Scan for methods in domain directories (stitch, project, screen)
function scanMethods(): MethodInfo[] {
  const methods: MethodInfo[] = [];
  const domains = ['stitch', 'project', 'screen'];

  for (const domain of domains) {
    const domainPath = join(METHODS_DIR, domain);
    if (!existsSync(domainPath) || !statSync(domainPath).isDirectory()) {
      continue;
    }

    const ops = readdirSync(domainPath).filter((name) => {
      const path = join(domainPath, name);
      return statSync(path).isDirectory();
    });

    for (const op of ops) {
      const pascalName = op.charAt(0).toUpperCase() + op.slice(1);
      methods.push({ domain, name: op, pascalName });
    }
  }

  return methods.sort((a, b) => {
    if (a.domain !== b.domain) return a.domain.localeCompare(b.domain);
    return a.name.localeCompare(b.name);
  });
}

const methods = scanMethods();

// Group by domain for organized output
const byDomain = methods.reduce(
  (acc, m) => {
    if (!acc[m.domain]) acc[m.domain] = [];
    acc[m.domain].push(m);
    return acc;
  },
  {} as Record<string, MethodInfo[]>
);

// Generate exports
const sections: string[] = [];

for (const [domain, ops] of Object.entries(byDomain)) {
  const domainTitle = domain.charAt(0).toUpperCase() + domain.slice(1);

  // Handler exports
  const handlerExports = ops
    .map((m) => `export { ${m.pascalName}Handler } from './${domain}/${m.name}/handler.js';`)
    .join('\n');

  // Spec type exports
  const specExports = ops
    .map(
      (m) =>
        `export type { ${m.pascalName}Spec, ${m.pascalName}Input, ${m.pascalName}Result } from './${domain}/${m.name}/spec.js';`
    )
    .join('\n');

  sections.push(`// ${domainTitle} handlers\n${handlerExports}\n\n// ${domainTitle} specs\n${specExports}`);
}

const content = `// Auto-generated barrel for methods
// Run: bun scripts/generate-barrels.ts

${sections.join('\n\n')}
`;

writeFileSync(OUTPUT_FILE, content);
console.log(`Generated ${OUTPUT_FILE} with ${methods.length} methods across ${Object.keys(byDomain).length} domains`);

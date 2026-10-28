// Checks the built site against the brand and copy rules (run after `docusaurus build`):
//   - no gradients in any stylesheet or page (docs/brand/README.md in the app repo)
//   - American spelling in what visitors read
//   - the pages the OAuth reviews link to exist, and the policy carries Google's Limited Use statement
import {readdirSync, readFileSync, statSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const BUILD = 'build';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : files.push(join(d, f))));
walk(BUILD);

const problems = [];
for (const f of files.filter((f) => /\.(css|html)$/.test(f))) {
  const text = readFileSync(f, 'utf8');
  if (/gradient\s*\(/i.test(text)) problems.push(`${f}: has a gradient`);
  if (f.endsWith('.html')) {
    const visible = text.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ');
    const british = visible.match(/\b(colou?rs?(?<=colours?)|favourite\w*|organis\w+|centre[sd]?|travell(ed|er|ers|ing)|licence|catalogue|behaviour\w*|cancelled|analys(e|ed|ing)\b|recognis\w+|personalis\w+|apologis\w+)\b/gi);
    if (british) problems.push(`${f}: British spelling: ${[...new Set(british)].join(', ')}`);
  }
}

for (const page of ['index.html', 'privacy.html', 'terms.html', 'data-deletion.html', 'help.html']) {
  if (!existsSync(join(BUILD, page))) problems.push(`missing ${page}`);
}
const privacy = existsSync(join(BUILD, 'privacy.html')) ? readFileSync(join(BUILD, 'privacy.html'), 'utf8').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ') : '';
const LIMITED_USE = "FiveStar's use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements";
if (!privacy.replace(/&#x27;|&#39;|’/g, "'").includes(LIMITED_USE)) problems.push('privacy.html: Limited Use statement missing or reworded');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`check-site: ${files.length} files, no gradients, American spelling, policy pages present`);

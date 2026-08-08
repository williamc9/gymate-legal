import { cp, mkdir, readFile, rm } from 'node:fs/promises';

const requiredFiles = ['index.html', 'styles.css', 'script.js', '.nojekyll'];
const html = await readFile('index.html', 'utf8');

const requiredFragments = [
  'id="privacy-en"', 'id="terms-en"', 'id="community-en"',
  'id="support-en"', 'id="delete-en"', 'id="privacy-zh"',
  'id="terms-zh"', 'id="community-zh"', 'id="support-zh"',
  'id="delete-zh"', 'triboholic@gmail.com', 'Chow William',
  'Bonus Wave balance and grant/spend', 'Bonus Wave 餘額及增減帳目',
];

for (const fragment of requiredFragments) {
  if (!html.includes(fragment)) throw new Error(`Missing required content: ${fragment}`);
}
if (/TODO|PLACEHOLDER|YOUR_EMAIL/i.test(html)) {
  throw new Error('Public page still contains placeholder content.');
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of requiredFiles) await cp(file, `dist/${file}`);
console.log('Gymate legal site validated and built.');

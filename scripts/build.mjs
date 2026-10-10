import { cp, mkdir, readFile, rm } from 'node:fs/promises';

const homepage = await readFile('index.html', 'utf8');
const legal = await readFile('legal/index.html', 'utf8');
const investors = await readFile('investors/index.html', 'utf8');
const investorScript = await readFile('investors/script.js', 'utf8');
const requiredHomepageFragments = [
  'Meet someone',
  'id="wave-story"',
  'id="ask-a-spot"',
  'href="legal/#privacy-en"',
  'href="legal/#delete-en"',
  'data-site-language="zh-HK"', 'data-site-language="zh-TW"',
  'href="investors/"',
];
const requiredLegalFragments = [
  'id="privacy-en"', 'id="terms-en"', 'id="community-en"',
  'id="support-en"', 'id="delete-en"', 'id="privacy-zh"',
  'id="terms-zh"', 'id="community-zh"', 'id="support-zh"',
  'id="delete-zh"', 'Bonus Wave balance and grant/spend',
  'Bonus Wave 餘額及增減帳目', 'Favorite Rooms are visible only to you',
  '最愛房間只得你睇到',
  'data-language="zh-TW"',
];
const requiredInvestorFragments = [
  'id="investor-form"', 'invest@gymley.app', 'data-language="zh-HK"',
  'data-language="zh-TW"', 'Anywhere people train', 'mailto:invest@gymley.app',
];

for (const fragment of requiredHomepageFragments) {
  if (!homepage.includes(fragment)) throw new Error(`Homepage is missing: ${fragment}`);
}
for (const fragment of requiredLegalFragments) {
  if (!legal.includes(fragment)) throw new Error(`Legal page is missing: ${fragment}`);
}
for (const fragment of requiredInvestorFragments) {
  if (!`${investors}\n${investorScript}`.includes(fragment)) throw new Error(`Investor page is missing: ${fragment}`);
}
if (investors.includes('href="mailto:invest@gymley.app"')) {
  throw new Error('Investor page should use the form as its single email action.');
}
if (/TODO|YOUR_EMAIL/i.test(`${homepage}\n${legal}\n${investors}\n${investorScript}`)) {
  throw new Error('Public pages still contain placeholder content.');
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
const rootFiles = [
  'index.html', 'CNAME', '.nojekyll', 'opening.css', 'crowd.js',
  'story.css', 'story.js', 'playground.css', 'playground.js',
  'tools-demo.css', 'tools-demo.js', 'i18n.js',
];
for (const file of rootFiles) await cp(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
await cp('legal', 'dist/legal', { recursive: true });
await cp('investors', 'dist/investors', { recursive: true });
await cp('connect', 'dist/connect', { recursive: true });
await cp('.well-known', 'dist/.well-known', { recursive: true });
console.log('Gymley website and legal pages validated and built.');

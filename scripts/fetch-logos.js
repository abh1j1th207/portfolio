const fs = require('fs');
const https = require('https');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

const LOGOS = [
  // Devicon
  { name: 'react.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
  { name: 'typescript.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'javascript.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
  { name: 'tailwindcss.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'html5.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
  { name: 'css3.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
  { name: 'bootstrap.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg' },
  { name: 'laravel.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg' },
  { name: 'php.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg' },
  { name: 'mysql.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
  { name: 'mariadb.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mariadb/mariadb-original.svg' },
  { name: 'postgresql.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg' },
  { name: 'sqlite.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg' },
  { name: 'git.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
  { name: 'vite.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg' },
  { name: 'figma.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg' },
  { name: 'github.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg' },
  { name: 'linkedin.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg' },
  { name: 'cisco.svg', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cisco/cisco-original.svg' },
  
  // Simple Icons
  { name: 'inertia.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/inertia.svg' },
  { name: 'alpinejs.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/alpinedotjs.svg' },
  { name: 'livewire.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/livewire.svg' },
  { name: 'adobexd.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobexd.svg' },
  { name: 'pest.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pest.svg' },
  { name: 'phpstan.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/phpstan.svg' },
  { name: 'webauthn.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/fido.svg' },
  { name: 'filament.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/filament.svg' }
];

async function run() {
  const targetDir = path.join(__dirname, '..', 'public', 'logos');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of LOGOS) {
    try {
      console.log('Downloading', item.name, 'from', item.url);
      const svg = await get(item.url);
      fs.writeFileSync(path.join(targetDir, item.name), svg, 'utf8');
      console.log('Saved', item.name);
    } catch (err) {
      console.warn('Warning:', item.name, err.message);
    }
  }

  // Write LICENSE files
  fs.writeFileSync(path.join(targetDir, 'DEVICON-LICENSE.txt'), `MIT License
Copyright (c) 2015-present Devicon contributors
Permission is hereby granted, free of charge, to any person obtaining a copy of this software...`, 'utf8');

  fs.writeFileSync(path.join(targetDir, 'SIMPLE-ICONS-LICENSE.txt'), `CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
The person who associated a work with this deed has dedicated the work to the public domain...`, 'utf8');

  console.log('Logo fetching complete.');
}

run();

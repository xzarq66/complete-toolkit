# 🚀 Complete Toolkit

Comprehensive toolkit with 6 powerful tools for encryption, scraping, APIs, automation, backups, and privacy.

## 🎯 Features

### 1. 🔐 Encryption Tool
```bash
npm run encryption -- generate-key
npm run encryption -- encrypt "text" "key"
npm run encryption -- decrypt "encrypted" "key"
```

### 2. 🕷️ Web Scraper
```bash
npm run scraper -- fetch https://example.com
npm run scraper -- fetch https://example.com -o output.html
npm run scraper -- scrape https://example.com "div.item" -o data.json
```

### 3. 🔌 API Integration
```bash
npm run api -- get https://api.example.com/data
npm run api -- post https://api.example.com/api '{"key":"value"}'
npm run api -- get https://api.example.com/data -o response.json
```

### 4. ⚙️ Automation Scripts
```bash
npm run automation -- schedule myTask "0 9 * * 1"
npm run automation -- list
```

### 5. 💾 Data Backup
```bash
npm run backup -- file myfile.txt
npm run backup -- file myfile.txt -n "custom-name"
npm run backup -- dir ./myproject
npm run backup -- list
```

### 6. 🛡️ Privacy Protection
```bash
npm run privacy -- anonymize "contact john@email.com at 555-1234"
npm run privacy -- anonymize-file data.txt -o anonymized.txt
npm run privacy -- mask-email john@example.com
npm run privacy -- mask-phone 555-123-4567
npm run privacy -- anon-id
```

## 📦 Installation

```bash
git clone https://github.com/xzarq66/complete-toolkit.git
cd complete-toolkit
npm install
```

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```
complete-toolkit/
├── tools/
│   ├── encryption/
│   │   ├── cli.js
│   │   └── index.js
│   ├── scraper/
│   │   ├── cli.js
│   │   └── index.js
│   ├── api/
│   │   └── cli.js
│   ├── automation/
│   │   ├── cli.js
│   │   └── index.js
│   ├── backup/
│   │   ├── cli.js
│   │   └── index.js
│   └── privacy/
│       ├── cli.js
│       └── index.js
├── package.json
└── README.md
```

## 🔒 Security Notes

- Encryption uses AES-256-CBC
- Always keep keys safe
- Use HTTPS for API calls
- Anonymization removes PII automatically
- Backups are encrypted with ZIP

## 📝 License

MIT © 2024

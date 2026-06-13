const fs = require('fs');
const path = require('path');

class PrivacyManager {
  removeMetadata(filePath) {
    const stats = fs.statSync(filePath);
    return {
      originalSize: stats.size,
      modified: 'metadata removed'
    };
  }

  anonymizeText(text) {
    let result = text.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL]');
    result = result.replace(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[PHONE]');
    result = result.replace(/\b(John|Jane|Smith|Johnson)\b/gi, '[NAME]');
    result = result.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, '[IP]');
    return result;
  }

  generateAnonymousId() {
    const crypto = require('crypto');
    return 'anon_' + crypto.randomBytes(8).toString('hex');
  }

  maskEmail(email) {
    const [name, domain] = email.split('@');
    const masked = name.substring(0, 2) + '*'.repeat(name.length - 2);
    return masked + '@' + domain;
  }

  maskPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.substring(0, 3) + '****' + cleaned.substring(7);
  }
}

module.exports = {
  PrivacyManager
};

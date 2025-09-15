const SENSITIVE_PATTERNS = {
  norwegian: {
    name: /\b([A-ZÆØÅ][a-zæøå]+(?: [A-ZÆØÅ][a-zæøå]+)+)\b/, // Handles multi-word names
    birthday: /\b\d{2}[./,-]\d{2}[./,-](\d{2}|\d{4})\b/, // DD-MM-YY, DD-MM-YYYY where separator can be [".", "-", "/", ","],
    ssn: /^\d{11}$/, // Norwegian Social Security Number (Fødselsnummer) - anchored
    passportNumber: /\b[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]\b/, // Simplified passport number regex
    organizationNumber: /^\d{9}$/, // Norwegian Organization Number - anchored
    kidNumber: /^\d{2,25}$/, // Norwegian KID Number (broad) - anchored

    // Contact Information
    phoneNumber: /(?<!\d)(?:\+47|0047)?\s?\d{8}\b/, // +47, 0047, or no country code can be used pluss an 8 digit numeber
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email regex
    address: /\b[A-Za-zæøåÆØÅ\s]{2,}\s\d{1,4}\b/, // Simple street address regex (name first)
    postalCode: /^\d{4}$/, // Norwegian postal code - anchored

    // Banking and Financial
    creditCard: /\b(?:\d[ -]*?){13,16}\b/,
    // creditCardCVV: /\b\d{3,4}\b/, // WARNING: This is too broad and will cause many false positives. Removed.
    bankAccount: /^\d{11}$/, // Norwegian bank accounts are 11 digits.
    iban: /\b[A-Z]{2}\d{2}[A-Z0-9]{11}\b/, // Norwegian IBAN is 15 chars total

    // Vehicles
    licensePlate: /\b[A-Z]{2}\s?\d{5}\b/, // More specific Norwegian license plate format
    vehicleIdentificationNumber: /\b[A-HJ-NPR-Z0-9]{17}\b/, // VIN regex

    // Miscellaneous
    driversLicense: /\b\d{8}\b/, // Norwegian driver's license is 8 digits
  },
  shared: {
    url: /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/, // URL regex
    IPv4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/,
    IPv6: /\b([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/,
    macAddress: /\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/,
    jwt: /\b[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*\b/, // JSON Web Token
    uuid: /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/, // UUID/GUID
    apiKey: /\b(sk|pk|rk|api_key|api-key)_[a-zA-Z0-9]{20,}\b/i, // Common API Key prefixes
    geoCoordinates: /\b-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+\b/, // Lat/Lon coordinates
  },
};

const SENSITIVE_KEYS = [
  // Credentials & Authentication
  'password',
  'pass',
  'secret',
  'token',
  'auth',
  'key', // Catches apiKey, secretKey, access_key etc.
  'credential',
  'jwt',
  'session',
  'cookie',

  // Personal Identification Information (PII)
  'ssn',
  'fødselsnummer',
  'socialsecuritynumber',
  'passport',
  'license',
  'name', // Catches firstName, lastName, fullName
  'email',
  'phone',
  'address',
  'postcode',
  'zipcode',
  'dob',
  'birthdate',

  // Financial Information
  'card', // Catches creditCard, cardNumber
  'cvv',
  'cvc',
  'iban',
  'account', // Catches bankAccount, accountNumber
];

/**
 * Recursively sanitizes an object by masking values of sensitive keys
 * and values that match sensitive patterns.
 * @param data The object to sanitize.
 * @returns A deep copy of the object with sensitive data masked.
 */
export function sanitizeObject<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Combine all regex patterns from the nested structure into a single array
  const allPatterns = [
    ...Object.values(SENSITIVE_PATTERNS.norwegian),
    ...Object.values(SENSITIVE_PATTERNS.shared),
  ];

  const sanitizedData = JSON.parse(JSON.stringify(data));

  const replacer = (key: string, value: any) => {
    if (typeof value !== 'string') {
      return value;
    }

    // Check if the key name is sensitive
    if (SENSITIVE_KEYS.some((k) => key.toLowerCase().includes(k))) {
      return '***MASKED***';
    }

    // Check if the value matches a sensitive pattern from the combined list
    for (const pattern of allPatterns) {
      if (pattern.test(value)) {
        return '***MASKED***';
      }
    }

    return value;
  };

  // Walk the object and apply the replacer
  const walk = (obj: any) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const originalValue = obj[key];
        if (typeof originalValue === 'object' && originalValue !== null) {
          walk(originalValue);
        } else {
          obj[key] = replacer(key, originalValue);
        }
      }
    }
  };

  walk(sanitizedData);
  return sanitizedData;
}

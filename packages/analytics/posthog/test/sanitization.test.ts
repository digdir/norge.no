import {assertEquals} from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {sanitizeObject} from '../src/sanitization.ts';

const MASKED = '***MASKED***';

Deno.test('sanitizeObject > should mask values of sensitive keys', () => {
  const dirtyObject = {
    username: 'testuser',
    password: 'mySecretPassword123',
    email: 'sensitive@example.com', // Key 'email' is sensitive
  };
  const cleanObject = sanitizeObject(dirtyObject);
  assertEquals(cleanObject.username, MASKED);
  assertEquals(cleanObject.password, MASKED);
  assertEquals(cleanObject.email, MASKED);
});

Deno.test(
  'sanitizeObject > should mask sensitive keys regardless of case',
  () => {
    const dirtyObject = {
      FirstName: 'John',
      'API-KEY': 'some-long-api-key',
    };
    const cleanObject = sanitizeObject(dirtyObject);
    assertEquals(cleanObject.FirstName, MASKED);
    assertEquals(cleanObject['API-KEY'], MASKED);
  }
);

Deno.test(
  'sanitizeObject > should mask values that match sensitive patterns',
  () => {
    const dirtyObject = {
      contactInfo: 'test@example.com', // Matches email pattern
      personalId: '12345678901', // Matches SSN pattern
      bankDetails: '12345678901', // Matches bank account pattern
      notes: 'This is a safe note.',
    };
    const cleanObject = sanitizeObject(dirtyObject);
    assertEquals(cleanObject.contactInfo, MASKED);
    assertEquals(cleanObject.personalId, MASKED);
    assertEquals(cleanObject.bankDetails, MASKED);
    assertEquals(cleanObject.notes, 'This is a safe note.');
  }
);

Deno.test('sanitizeObject > should recursively sanitize nested objects', () => {
  const dirtyObject = {
    level1: {
      safeProp: 'i am safe',
      user: {
        name: 'Sensitive Name', // Sensitive key
        details: {
          contact_email: 'another.sensitive@email.com', // Sensitive value
        },
      },
      session_token: 'jwt-token-string', // Sensitive key
    },
  };
  const cleanObject = sanitizeObject(dirtyObject);
  assertEquals(cleanObject.level1.safeProp, 'i am safe');
  assertEquals(cleanObject.level1.user.name, MASKED);
  assertEquals(cleanObject.level1.user.details.contact_email, MASKED);
  assertEquals(cleanObject.level1.session_token, MASKED);
});

Deno.test(
  'sanitizeObject > should not modify an object with no sensitive data',
  () => {
    const safeObject = {
      id: 12345,
      description: 'A simple description.',
      isActive: true,
      tags: ['one', 'two'],
    };
    const cleanObject = sanitizeObject(JSON.parse(JSON.stringify(safeObject)));
    assertEquals(cleanObject, safeObject);
  }
);

Deno.test(
  'sanitizeObject > should handle null, undefined, and empty objects',
  () => {
    assertEquals(sanitizeObject(null), null);
    assertEquals(sanitizeObject(undefined), undefined);
    assertEquals(sanitizeObject({}), {});
  }
);

Deno.test('sanitizeObject > should sanitize objects within an array', () => {
  const dirtyArray = [
    {id: 1, email: 'user1@test.com'},
    {id: 2, description: 'safe'},
    {id: 3, password: '123'},
  ];
  const cleanArray = sanitizeObject(dirtyArray);
  assertEquals(cleanArray[0].email, MASKED);
  assertEquals(cleanArray[1].description, 'safe');
  assertEquals(cleanArray[2].password, MASKED);
});

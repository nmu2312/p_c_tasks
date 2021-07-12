import { Person } from './functions.js';

jest.mock('./functions.js');

test('Person.asyncGetName()', async () => {
  Person.mockImplementation((name) => {
    return {
      asyncGetName: () => Promise.resolve(name + 'さん'),
    };
  });
  expect(await new Person('Jack').asyncGetName()).toBe('Jackさん');
});

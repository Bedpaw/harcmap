function * uidGenerator () {
  let index = 0;
  while (true) {
    if (index <= 9999) yield index++;
    else yield index = 0;
  }
}

type FieldUidGenerator = {
  prefix: Readonly<string>
  generator: Readonly<Generator>
  getNext: () => string
}

export const fieldUidGenerator: Readonly<FieldUidGenerator> = {
  prefix: 'field-uid-',
  generator: uidGenerator(),
  getNext: () => {
    const prefix = fieldUidGenerator.prefix;
    const uid = fieldUidGenerator.generator.next().value;
    const zeroPrefix = '0'.repeat(4 - String(uid).length);
    return prefix + zeroPrefix + uid;
  },
};

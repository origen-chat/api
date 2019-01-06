export type PubsubKey = string;

type PubsubKeyMaker = (pubsubKeyWithoutNamespace: string) => PubsubKey;

function makePubsubKeyMaker<TNamespace extends string>(
  namespace: TNamespace,
): PubsubKeyMaker {
  const makePubsubKey: PubsubKeyMaker = pubsubKeyWithoutNamespace =>
    `${namespace}/${pubsubKeyWithoutNamespace}`;

  return makePubsubKey;
}

export type PubsubKeys<TPubsubKeyWithoutNamespace extends string> = Readonly<
  { [key in TPubsubKeyWithoutNamespace]: PubsubKey }
>;

export function makePubsubKeys<TPubsubKeyWithoutNamespace extends string>(
  pubsubKeysWithoutNamespace: ReadonlyArray<TPubsubKeyWithoutNamespace>,
  namespace: string,
): PubsubKeys<TPubsubKeyWithoutNamespace> {
  const makePubsubKey = makePubsubKeyMaker(namespace);

  const pubsubKeys = pubsubKeysWithoutNamespace.reduce(
    (acc, pubsubKeyWithoutNamespace) => ({
      ...acc,
      [pubsubKeyWithoutNamespace]: makePubsubKey(pubsubKeyWithoutNamespace),
    }),
    {},
  ) as PubsubKeys<TPubsubKeyWithoutNamespace>;

  return pubsubKeys;
}

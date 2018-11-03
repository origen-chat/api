export type TriggerName = string;

type TriggerNameMaker = (triggerNameWithoutNamespace: string) => TriggerName;

function makeTriggerNameMaker<TNamespace extends string>(
  namespace: TNamespace,
): TriggerNameMaker {
  const makeTriggerName: TriggerNameMaker = triggerNameWithoutNamespace =>
    `${namespace}/${triggerNameWithoutNamespace}`;

  return makeTriggerName;
}

export type TriggerNames<
  TTriggerNameWithoutNamespace extends string
> = Readonly<{ [key in TTriggerNameWithoutNamespace]: TriggerName }>;

export function makeTriggerNames<TTriggerNameWithoutNamespace extends string>(
  triggerNamesWithoutNamespace: ReadonlyArray<TTriggerNameWithoutNamespace>,
  namespace: string,
): TriggerNames<TTriggerNameWithoutNamespace> {
  const makeTriggerName = makeTriggerNameMaker(namespace);

  const triggerNames = triggerNamesWithoutNamespace.reduce(
    (acc, triggerNameWithoutNamespace) => ({
      ...acc,
      [triggerNameWithoutNamespace]: makeTriggerName(
        triggerNameWithoutNamespace,
      ),
    }),
    {},
  ) as TriggerNames<TTriggerNameWithoutNamespace>;

  return triggerNames;
}

export type ActionType = string;

export type ActionTypeMaker = (actionTypeWithoutScope: string) => ActionType;

export function makeActionTypeMaker<TScope extends string>(
  scope: TScope,
): ActionTypeMaker {
  const makeActionType: ActionTypeMaker = actionTypeWithoutScope =>
    scope + actionTypeWithoutScope;

  return makeActionType;
}

export type ActionTypes<TActionTypeWithoutScope extends string> = Readonly<
  { [key in TActionTypeWithoutScope]: ActionType }
>;

export function makeActionTypes<TActionTypeWithoutScope extends string>(
  actionTypesWithoutScope: ReadonlyArray<TActionTypeWithoutScope>,
  scope: string,
): ActionTypes<TActionTypeWithoutScope> {
  const makeActionType = makeActionTypeMaker(scope);

  const actionTypes = actionTypesWithoutScope.reduce(
    (acc, actionTypeWithoutScope) => ({
      ...acc,
      [actionTypeWithoutScope]: makeActionType(actionTypeWithoutScope),
    }),
    {},
  ) as ActionTypes<TActionTypeWithoutScope>;

  return actionTypes;
}

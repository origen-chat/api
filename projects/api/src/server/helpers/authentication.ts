import { Context } from '../types';

export function isViewerAuthenticated(
  context: Context,
): context is Context & Readonly<{ viewer: NonNullable<Context['viewer']> }> {
  return !!context.viewer;
}

import { Entity } from '../types';

export const getCountSuffix = (array: unknown[]): string =>
  array.length > 0 ? `(${array.length})` : '';

export function getUniqueArray<T>(data: T[]): T[] {
  return data.filter((value, index) => {
    const val = JSON.stringify(value);

    return (
      index ===
      data.findIndex((obj) => {
        return JSON.stringify(obj) === val;
      })
    );
  });
}

export const arrayMove = <T,>(array: T[], from: number, to: number): T[] => {
  array.splice(to, 0, array.splice(from, 1)[0]);

  return array;
};

export const putElementsFirst = <T extends Entity>(
  array: readonly T[],
  elementsToPutFirstArray: T['id'][],
): T[] => [
  ...array.filter((elm) => elementsToPutFirstArray.includes(elm.id)),
  ...array.filter((elm) => !elementsToPutFirstArray.includes(elm.id)),
];

import deepmerge from 'deepmerge'

import { ObjectLiteral } from '@src/interfaces/object.interface'

interface MergeObjectsOptions {
  array: 'overwrite' | 'merge'
}

/** Merge objects deep from overwriting the properties from source to target.
 * Does not mutate the object */
export function mergeObjects (target: ObjectLiteral, source: ObjectLiteral, options?: MergeObjectsOptions): ObjectLiteral {
  // array strategy
  let arrayMergeStrategy: (destinationArray, sourceArray) => any[]
  if (options?.array === 'merge') {
    arrayMergeStrategy = (destinationArray, sourceArray): any[] => [ ...destinationArray, ...sourceArray ]
  } else {
    arrayMergeStrategy = (destinationArray, sourceArray): any[] => sourceArray
  }

  return deepmerge(target, source, { arrayMerge: arrayMergeStrategy })
}
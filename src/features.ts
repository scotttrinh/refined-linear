import { array } from "fp-ts/lib/Array";
import { Lazy } from "fp-ts/lib/function";
import { TaskEither, taskEither, tryCatch } from "fp-ts/lib/TaskEither";

export interface FeatureDetails {
  init: Lazy<Promise<void>>;
  deinit: Lazy<Promise<void>>;
  include: Lazy<Boolean>[];
  exclude: Lazy<Boolean>[];
}

export const add = (definition: FeatureDetails): TaskEither<Error, void> => {
  return tryCatch<Error, void>(
    () => {
      const everyIncludeFalse = definition.include.every(c => !c());
      const everyExcludeTrue = definition.exclude.some(c => c());
      const shouldSkip = everyIncludeFalse || everyExcludeTrue;
      return shouldSkip ? definition.deinit() : definition.init();
    },
    (reason: unknown) => new Error(String(reason))
  );
};

export const runSequence = async (
  tasks: TaskEither<Error, void>[]
): Promise<void> => {
  await array.sequence(taskEither)(tasks)();
};

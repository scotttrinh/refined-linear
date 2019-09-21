import { array } from "fp-ts/lib/Array";
import { Lazy } from "fp-ts/lib/function";
import { TaskEither, taskEither, tryCatch } from "fp-ts/lib/TaskEither";

export interface FeatureDetails {
  id: string;
  when: (callback: Lazy<Promise<void>>) => void;
  do: Lazy<Promise<void>>;
  undo: Lazy<Promise<void>>;
  include: Lazy<Boolean>[];
  exclude: Lazy<Boolean>[];
}

const run = (definition: FeatureDetails): Promise<void> => {
  const everyIncludeFalse = definition.include.every(c => !c());
  const everyExcludeTrue = definition.exclude.some(c => c());
  const shouldSkip = everyIncludeFalse || everyExcludeTrue;
  return shouldSkip ? definition.undo() : definition.do();
};

export const add = (definition: FeatureDetails): TaskEither<Error, void> => {
  return tryCatch<Error, void>(
    async () => {
      definition.when(() => run(definition));
    },
    (reason: unknown) => new Error(String(reason))
  );
};

export const runSequence = async (
  tasks: TaskEither<Error, void>[]
): Promise<void> => {
  await array.sequence(taskEither)(tasks)();
};

import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";

import { query } from "../api";
import { numberFromNullable } from "../io/number-from-nullable";

export const issueEstimate = t.type({
  id: t.string,
  number: t.number,
  estimate: numberFromNullable(0)
});

export type IssueEstimate = t.TypeOf<typeof issueEstimate>;

export const getAll = async (): Promise<
  E.Either<t.Errors, IssueEstimate[]>
> => {
  try {
    const response = await query(`
issues {
  id,
  number,
  estimate
}
`);

    return t.array(issueEstimate).decode(response.issues);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

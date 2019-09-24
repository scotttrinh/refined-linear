import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import { GraphQLClient } from "graphql-request";
import { getAll } from "./options-storage";
import { pipe } from "fp-ts/lib/pipeable";

class RefinedLinearError extends Error {
  constructor(...messages: string[]) {
    super(messages.join("\n"));
  }
}

const LINEAR_URL = "https://api.linear.app/graphql";

export async function query(q: string): Promise<any> {
  const options = await getAll();

  return pipe(
    options,
    R.sequence(O.option),
    O.fold(
      () => {
        throw new RefinedLinearError(
          "Token and Team ID not set! Go to the Refined Linear preference page and set them."
        );
      },
      async ({ token, teamId }) => {
        const client = new GraphQLClient(LINEAR_URL, {
          headers: {
            Authorization: token
          }
        });
        try {
          return client.request(`{ team(id: "${teamId}") { ${q} } }`);
        } catch (e) {
          throw new RefinedLinearError(e.message);
        }
      }
    )
  );
}

import { GraphQLClient } from 'graphql-request';
import { JsonObject } from "type-fest";
interface GraphQLResponse {
  data: JsonObject;
  errors: { message: string }[];
}

class RefinedLinearError extends Error {
  constructor(...messages: string[]) {
    super(messages.join("\n"));
  }
}

const LINEAR_URL = "https://api.linear.app/graphql";

export async function query(q: string): Promise<any> {
  const token = await storage.get('token');
  const teamId = await storage.get('teamId');

  const client = new GraphQLClient(LINEAR_URL, {
    headers: {
      Authorization: token
    }
  });
  try {
    const response = await client.request(`{ team(id: "${teamId}") { ${q} } }`);
    return response;
  } catch (e) {
    throw new RefinedLinearError(e.message);
  }
}

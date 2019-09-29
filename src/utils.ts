import * as O from "fp-ts/lib/Option";

export function select(
  selector: string,
  baseElement: Element | Document = document
): O.Option<Element> {
  return O.fromNullable(baseElement.querySelector(selector));
}

export function selectAll(
  selector: string,
  baseElement: Element | Document = document
): Element[] {
  return Array.from(baseElement.querySelectorAll(selector));
}

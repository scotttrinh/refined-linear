import * as O from "fp-ts/lib/Option";

export function select<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  baseElement: Element | Document = document
): O.Option<HTMLElementTagNameMap[K]> {
  return O.fromNullable(baseElement.querySelector(selector));
}

export function selectAll<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  baseElement: Element | Document = document
): HTMLElementTagNameMap[K][] {
  return Array.from(baseElement.querySelectorAll(selector));
}

import selectNullable from "select-dom";
import * as O from "fp-ts/lib/Option";

export function select<T extends keyof HTMLElementTagNameMap>(
  selectors: T,
  baseElement?: ParentNode
): O.Option<HTMLElementTagNameMap[T]>;
export function select<T extends keyof SVGElementTagNameMap>(
  selectors: T,
  baseElement?: ParentNode
): O.Option<SVGElementTagNameMap[T]>;
export function select<T extends HTMLElement = HTMLElement>(
  selectors: string,
  baseElement?: ParentNode
): O.Option<T>;
export function select(
  selectors: string,
  baseElement?: ParentNode
): O.Option<Element> {
  return O.fromNullable(selectNullable(selectors, baseElement));
}

type BaseElements = ParentNode | ArrayLike<ParentNode>;

export function selectAll<T extends keyof HTMLElementTagNameMap>(
  selectors: T,
  baseElements?: BaseElements
): HTMLElementTagNameMap[T][];
export function selectAll<T extends keyof SVGElementTagNameMap>(
  selectors: T,
  baseElements?: BaseElements
): SVGElementTagNameMap[T][];
export function selectAll<T extends HTMLElement = HTMLElement>(
  selectors: string,
  baseElements?: BaseElements
): T[];
export function selectAll(
  selectors: string,
  baseElements?: BaseElements
): Element[] {
  return selectNullable.all(selectors, baseElements);
}

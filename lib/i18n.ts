import type { Locale } from "@/lib/locale";
import en from "@/messages/en.json";
import id from "@/messages/id.json";

const catalogs = { id, en } as const;

type MessageTree = typeof id;

function resolvePath(tree: MessageTree, key: string): string | undefined {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }
    return undefined;
  }, tree) as string | undefined;
}

export function translate(
  locale: Locale,
  key: string,
  values?: Record<string, string | number>,
): string {
  const message =
    resolvePath(catalogs[locale], key) ??
    resolvePath(catalogs.id, key) ??
    key;

  if (!values) {
    return message;
  }

  return Object.entries(values).reduce(
    (result, [name, value]) =>
      result.replaceAll(`{${name}}`, String(value)),
    message,
  );
}

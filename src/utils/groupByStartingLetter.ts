interface groupByStartingLetterArgs {
  items: Record<string, any>[];
  key: string;
  search: string;
}

export const groupByStartingLetter = ({
  items,
  key,
  search,
}: groupByStartingLetterArgs): Record<string, []> | undefined => {
  if (!items || !key) return;

  const alphabet = [...Array(26).keys()].map((i) =>
    String.fromCharCode(i + 97)
  );

  return alphabet.reduce((prev, current) => {
    const elements = items.filter((item) => {
      return item[key].toLowerCase().startsWith(current.toLowerCase());
    });

    const test = elements.filter((item) => {
      return item[key]?.toLowerCase()?.includes(search.toLowerCase());
    });

    if (test.length === 0) {
      return { ...prev };
    }

    return {
      ...prev,
      [current.toUpperCase()]: test,
    };
  }, {});
};

export function chunkArray<T>(array: T[], chunkLength: number): T[][] {
  return array.reduce((acc, cur, index) => {
    const chunkIndex = Math.floor(index / chunkLength);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);
}

export function createSelectOptions(options: string[]) {
  return options.map((option) => ({ option, value: option }));
}

export function sortTimezones(timezones: string[]) {
  return timezones.sort((a, b) => {
    let offsetA = parseInt(a.slice(3));
    let offsetB = parseInt(b.slice(3));

    if (a === "UTC") {
      offsetA = 0;
    }
    if (b === "UTC") {
      offsetB = 0;
    }

    if (offsetA === offsetB && a === "UTC") {
      return 1;
    }
    if (offsetA === offsetB && b === "UTC") {
      return -1;
    }
    return offsetA - offsetB;
  });
}

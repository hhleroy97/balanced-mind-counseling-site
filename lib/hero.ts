export function splitPracticeName(practiceName: string) {
  const words = practiceName.trim().split(/\s+/).filter(Boolean);

  if (words.length <= 1) {
    return {
      firstLine: practiceName,
      secondLine: "",
    };
  }

  return {
    firstLine: words.slice(0, -1).join(" "),
    secondLine: words.at(-1) ?? "",
  };
}

export function getHeroLogoThreshold(offsetTop: number, height: number, buffer = 24) {
  return offsetTop + height + buffer;
}

export const cleanText = (text: string) => {
  return text.replace(/\r\n/g, "\n").replace(/\t/g, " ").trim();
};

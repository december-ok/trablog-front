export const getFormDate = (strDate: Date): string => {
  const date = new Date(strDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

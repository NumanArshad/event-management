const isEmpty = (data) =>
  data === null ||
  data === undefined ||
  (typeof data === "string" && data.trim().length === 0) ||
  (typeof Object === "object" && Object.keys(data)?.length === 0);
export default isEmpty;

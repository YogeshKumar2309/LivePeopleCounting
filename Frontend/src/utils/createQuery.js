

export const createQueryParams = (filters) => {
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    if (filters[key] !== "" && filters[key] !== undefined) {
      params.append(key, filters[key]);
    }
  });
  return params.toString();
}
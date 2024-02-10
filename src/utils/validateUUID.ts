export const validateUUID = (id: unknown) => {
  const regex = /^[a-z,0-9,-]{36,36}$/;
  if (typeof id !== 'string') return false;
  return regex.test(id);
};

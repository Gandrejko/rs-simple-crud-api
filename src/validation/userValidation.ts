export const validateUser = (data: {
  [key: string]: string | number | string[];
}) => {
  if (typeof data !== 'object') return false;

  if (!(data.username && data.age && data.hobbies)) return false;
  if (typeof data.username !== 'string') return false;
  if (typeof data.age !== 'number') return false;
  if (
    !(
      Array.isArray(data.hobbies) &&
      data.hobbies.every((hobby) => typeof hobby === 'string')
    )
  )
    return false;
  return true;
};

import yaml from 'js-yaml';

// eslint-disable-next-line
type YAMLObject = string | object;

export const LoadSource = <T extends YAMLObject>(source: string): T => {
  const data: T = yaml.safeLoad(source) as T;
  return data;
};

import yaml from 'js-yaml';

import { TreeNode, Link, TriggerFunction } from './node';
import { TreeSource, TreeNodeSource, TreeLinkSource } from './types';

// eslint-disable-next-line
type YAMLObject = string | object;

export const LoadSource = <T extends YAMLObject>(source: string): T => {
  const data: T = yaml.safeLoad(source) as T;
  return data;
};

export const LoadTree = (source: string): TreeSource => {
  return LoadSource(source) as TreeSource;
};

const ParseNode = (name: string, source: TreeNodeSource): TreeNode => {
  const message = source.REPLY;
  const node = new TreeNode(name, message, source.ROOT);
  return node;
};

const ParseLink = (source: TreeLinkSource, nodes: Record<string, TreeNode>): Link => {
  const fromNode = nodes[source.FROM];
  const toNode = nodes[source.TO];
  const shouldTrigger: TriggerFunction = null; // TODO: implement parser
  const link = new Link(fromNode, toNode, shouldTrigger);
  return link;
};

export const ParseTree = (source: TreeSource): TreeNode => {
  let root: TreeNode = null;
  const nodes: Record<string, TreeNode> = {};
  const nodeKeys = Object.keys(source.NODES);
  for (const key of nodeKeys) {
    const node = ParseNode(key, source.NODES[key]);
    nodes[key] = node;
    if (source.NODES[key].ROOT) {
      root = node;
    }
  }
  const links: Link[] = [];
  for (const linkSource of source.LINKS) {
    const link = ParseLink(linkSource, nodes);
    links.push(link);
  }
  return root;
};

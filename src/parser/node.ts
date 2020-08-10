export type TriggerFunction = (input: string) => boolean;

export class TreeNode {

  public readonly name: string;
  public readonly isRoot: boolean;
  public readonly message: string;
  private links: Link[];

  constructor(name: string, message: string, isRoot?: boolean) {
    this.name = name;
    this.message = message;
    this.isRoot = isRoot;
    this.links = [];
  }

  public addLink(next: TreeNode, shouldTrigger: TriggerFunction): void {
    const link = new Link(this, next, shouldTrigger);
    this.links.push(link);
  }

  public nextNode(input: string): TreeNode {
    let next: TreeNode = null;
    for (const link of this.links) {
      if (link.shouldTrigger(input)) {
        next = link.to;
        break;
      }
    }
    return next;
  }

  public isEnd(): boolean {
    return this.links.length === 0;
  }

}

export class Link {

  public readonly from: TreeNode;
  public readonly to: TreeNode;
  public readonly shouldTrigger: TriggerFunction;

  constructor(from: TreeNode, to: TreeNode, shouldTrigger: TriggerFunction) {
    this.from = from;
    this.to = to;
    this.shouldTrigger = shouldTrigger;
  }

}

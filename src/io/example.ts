import { TerminalBrain, TerminalOutput } from './terminal';

type TriggerFunction = (input: string) => boolean;

class Node {

  public readonly isRoot: boolean;
  public readonly message: string;
  private links: Link[];

  constructor(message: string, isRoot?: boolean) {
    this.message = message;
    this.isRoot = isRoot;
    this.links = [];
  }

  public addLink(next: Node, shouldTrigger: TriggerFunction) {
    const link = new Link(this, next, shouldTrigger);
    this.links.push(link);
  }

  public nextNode(input: string): Node {
    let next: Node = null;
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

class Link {

  public readonly from: Node;
  public readonly to: Node;
  public readonly shouldTrigger: TriggerFunction;

  constructor(from: Node, to: Node, shouldTrigger: TriggerFunction) {
    this.from = from;
    this.to = to;
    this.shouldTrigger = shouldTrigger;
  }

}

const RootNode = new Node('Did you take your medication? (Yes/No)', true);

const YesNode = new Node('Great! Thank you.');

const NoNode = new Node('Oh no, go take it now!');

RootNode.addLink(YesNode, (input: string) => {
  return input.toLowerCase() === 'yes';
});

RootNode.addLink(NoNode, (input: string) => {
  return input.toLowerCase() === 'no';
});


class ExampleBrain implements TerminalBrain {

  private readonly root: Node;
  private current: Node;

  constructor() {
    this.root = RootNode;
    this.current = RootNode;
  }

  public async reset(): Promise<void> {
    this.current = RootNode;
    return;
  }

  public async getFirstMessage(): Promise<string> {
    return this.root.message;
  }

  public async input(body: string): Promise<TerminalOutput> {
    const next = this.current.nextNode(body);
    if (!next) {
      return {
        message: 'Sorry, we did not understand that!',
        isEnd: false
      };
    }
    this.current = next;
    return {
      message: next.message,
      isEnd: next.isEnd()
    };
  }

}

export default ExampleBrain;

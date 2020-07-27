import { TerminalBrain, TerminalOutput } from './terminal';

class DummyBrain implements TerminalBrain {

  private counter: number;

  constructor() {
    this.counter = 0;
  }

  public async reset(): Promise<void> {
    this.counter = 0;
    return;
  }

  public async getFirstMessage(): Promise<string> {
    return 'I count to 3 and then end. Do you want to continue?';
  }

  public async input(body: string): Promise<TerminalOutput> {
    if (body.toLowerCase() !== 'yes') {
      return {
        message: 'Sorry, I did not understand that. Type YES to continue.',
        isEnd: false,
        data: {
          counter: this.counter
        }
      };
    }
    const isEnd = this.counter === 2;
    this.counter++;
    const data = {
      counter: this.counter
    };
    const message = `I am at ${this.counter} of 3. Do you want to continue?`;
    return { message, isEnd, data };
  } 

}

export default DummyBrain;

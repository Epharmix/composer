import inquirer from 'inquirer';

export interface TerminalOutput {
  message: string | string[];
  isEnd: boolean;
  data?: any;
}

export interface TerminalBrain {
  getFirstMessage: () => Promise<string | string[]>;
  reset: () => Promise<any>;
  input: (string) => Promise<TerminalOutput>;
}

class Terminal<T extends TerminalBrain> {

  private brain: T;

  constructor(brain: T) {
    this.brain = brain;
  }

  public async start(): Promise<void> {
    let message = await this.brain.getFirstMessage();
    if (Array.isArray(message)) {
      message = message.join(' ');
    }
    let hasEnded = false;
    do {
      const { input } = await inquirer.prompt([{
        message: message,
        name: 'input',
        type: 'input'
      }]);
      const output = await this.brain.input(input);
      message = output.message;
      hasEnded = output.isEnd;
      const data = output.data;
      if (hasEnded) {
        if (Array.isArray(message)) {
          message = message.join(' ');
        }
        console.info(message);
        console.info('Ending...');
      }
      if (data) {
        console.info(JSON.stringify(data));
      }
    } while (!hasEnded);
  }

}

export default Terminal;

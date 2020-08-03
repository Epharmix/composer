import Terminal from './terminal';
import ExampleBrain from './example';

const terminal = new Terminal(new ExampleBrain());
terminal.start();

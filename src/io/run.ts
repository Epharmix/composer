import Terminal from './terminal';
import DummyBrain from './dummy';

const terminal = new Terminal(new DummyBrain());
terminal.start();

// Worker: concorrência assíncrona com a UI; em aparelhos multi-core, o navegador pode executá-lo em paralelo.
import { summarizeMatches } from './math.js';
self.onmessage = ({ data }) => self.postMessage(summarizeMatches(data));

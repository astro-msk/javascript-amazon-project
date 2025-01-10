import {formatCurrency} from '../scripts/utils/money.js';

describe('test suit: formatcurrency', () => {
  it ('converts cents to dollars', () => {
    except(formatCurrency(1900)).toEqual('19.00');
  });
});
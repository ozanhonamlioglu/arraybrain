import { ExtractedAlternativeKeys, Value, Direction } from './types';

export class SortTools {
  static getObjectValuesWithLevels = (keylist: string[], object: any): any => {
    let objInstance = object;
    keylist.map(key => {
      objInstance = objInstance[key];
    });

    return objInstance;
  };

  static extractAlternatives = (
    alternativeKey: string
  ): ExtractedAlternativeKeys => {
    // 'props.date=date|asc'
    if (alternativeKey) {
      let RLValues = alternativeKey.split('=');
      let RValues = RLValues[0].split('.');
      let LValues = RLValues[1].split('|');

      return {
        keys: RValues,
        valueType: LValues[0] as Value,
        direction: LValues[1] as Direction
      };
    } else {
      throw new Error('[-] Undefined alternativeKey');
    }
  };

  static sortExtractor = (a: any, b: any): number => a - b;

  // dont repeat yourself to write again and again if else statements. Use here
  static sorterSwitchCase = (
    a: any,
    b: any,
    direction: string,
    valueType: string
  ): number => {
    if (valueType === 'date') {
      if (direction === 'asc') {
        return SortTools.sortExtractor(new Date(a), new Date(b));
      } else {
        return SortTools.sortExtractor(new Date(b), new Date(a));
      }
    } else {
      if (direction === 'asc') {
        return SortTools.sortExtractor(a, b);
      } else {
        return SortTools.sortExtractor(b, a);
      }
    }
  };
}

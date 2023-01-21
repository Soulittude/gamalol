import { Injectable } from '@angular/core';
import { spellIdArr } from './json/spellsId';
import { runeIdArr } from './json/runeIds';
import { MajorRunesI, Rune, Slot } from './riot_api/model/runes.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  runeIdToUrl(rune1: string, rune2: string)
  {
    var majRunesArr = runeIdArr as MajorRunesI[];

    let majRune = "";
    let majRuneTitle = "";

    let minRune = "";
    let minRuneTitle = "";

    for(var i in majRunesArr)
    {
      var slotsArr = majRunesArr[i].slots as Slot[];
      var runesArr = slotsArr[0].runes as Rune[];

      if(majRunesArr[i].id.toString() == rune2)
      {
        minRune = majRunesArr[i].icon;
        minRuneTitle = majRunesArr[i].name;
      }

      for(var k in runesArr)
      {
        if(runesArr[k].id.toString() == rune1)
        {
          majRune = runesArr[k].icon;
          majRuneTitle = runesArr[k].name;
        }
      }
    }

    return [majRune, majRuneTitle, minRune, minRuneTitle]
  }

  spellIdToName(spellId1 : string, spellId2 : string){

    var spellsObj = spellIdArr.data as any;

    let spellD = "";
    let spellDTitle = "";

    let spellF = "";
    let spellFTitle = "";

    for(var i in spellsObj)
    {
      if(spellsObj[i]['key'] == spellId1)
      {
        spellD = spellsObj[i].id;
        spellDTitle = spellsObj[i].name;
      }
      if(spellsObj[i]['key'] == spellId2)
      {
        spellF = spellsObj[i].id;
        spellFTitle = spellsObj[i].name;
      }
    }

    return [spellD, spellDTitle, spellF, spellFTitle]
  }
}

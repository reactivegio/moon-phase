/**
 * Restituisce un numero che rappresenta la fase lunare attuale
 * 0 => New Moon
 * 1 => Waxing Crescent Moon
 * 2 => Waxing Crescent Moon
 * 3 => Waxing Crescent Moon
 * 4 => Quarter Moon
 * 5 => Quarter Moon
 * 6 => Quarter Moon
 * 7 => Waxing Gibbous Moon
 * 8 => Waxing Gibbous Moon
 * 9 => Waxing Gibbous Moon
 * 10 => Full Moon
 * 11 => Waning Gibbous Moon
 * 12 => Waning Gibbous Moon
 * 13 => Waning Gibbous Moon
 * 14 => Last Quarter Moon
 * 15 => Last Quarter Moon
 * 16 => Last Quarter Moon
 * 17 => Waning Crescent Moon
 * 18 => Waning Crescent Moon
 * 19 => Waning Crescent Moon
 * @param {*} year
 * @param {*} month
 * @param {*} day
 */
export function getMoonPhaseByDate(year, month, day) {
  let c = 0;
  let e = 0;
  let actualPhase = 0;
  let totDayElapsed = 0;
  let percentage = -1;
  if (month < 3) {
    year--;
    month += 12;
  }
  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  totDayElapsed = c + e + day - 694039.09;
  totDayElapsed /= 29.5305882; //divide by the moon cycle
  actualPhase = parseInt(totDayElapsed); //int(totDayElapsed) -> b, take integer part of totDayElapsed
  totDayElapsed -= actualPhase; //subtract integer part to leave fractional part of original totDayElapsed
  actualPhase = Math.round(totDayElapsed * 21); //scale fraction from 0-10 and round
  if (actualPhase >= 20 || actualPhase === 0) {
    actualPhase = 0; //0 and 8 are the same so turn 8 into 0
    percentage = 0;
  }

  if (percentage < 0) {
    if (actualPhase > 10)
      percentage = Math.round((actualPhase - 10) * 0.1 * 100) / 100;
    else percentage = Math.round(actualPhase * 0.1 * 100) / 100;
  }
  return new Promise((resolve, reject) => {
    resolve({
      actualPhase: actualPhase,
      isWaxing: actualPhase < 11,
      percentage: percentage,
    });
  });
}

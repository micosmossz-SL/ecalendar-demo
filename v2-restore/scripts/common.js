/**
 * common.js — 公共时间工具函数
 * 供所有 design-*.html 引用
 */

/** 返回当前时间各分量 */
function getTime() {
  const now = new Date();
  return {
    hours:   now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    now
  };
}

/** 补零：不足两位的数字前面加 0 */
function padZero(n) {
  return String(n).padStart(2, '0');
}

/**
 * 将当前时刻转为英文读白。
 * 逻辑：计算距次日 00:00（午夜）的剩余小时和分钟，输出如：
 *   "ELEVEN FORTYFOUR TO MIDNIGHT"
 *
 * 待确认：原设计稿读白逻辑是"到午夜"还是"到下一整点"？
 * 当前实现采用"到午夜"方案。
 */
function timeToWords(hours, minutes) {
  const HOUR_WORDS = [
    'MIDNIGHT', 'ONE',   'TWO',   'THREE', 'FOUR',  'FIVE',
    'SIX',      'SEVEN', 'EIGHT', 'NINE',  'TEN',   'ELEVEN',
    'NOON',     'ONE',   'TWO',   'THREE', 'FOUR',  'FIVE',
    'SIX',      'SEVEN', 'EIGHT', 'NINE',  'TEN',   'ELEVEN'
  ];
  const MIN_WORDS = [
    '',          'ONE',       'TWO',        'THREE',      'FOUR',
    'FIVE',      'SIX',       'SEVEN',      'EIGHT',      'NINE',
    'TEN',       'ELEVEN',    'TWELVE',     'THIRTEEN',   'FOURTEEN',
    'FIFTEEN',   'SIXTEEN',   'SEVENTEEN',  'EIGHTEEN',   'NINETEEN',
    'TWENTY',    'TWENTYONE', 'TWENTYTWO',  'TWENTYTHREE','TWENTYFOUR',
    'TWENTYFIVE','TWENTYSIX', 'TWENTYSEVEN','TWENTYEIGHT','TWENTYNINE',
    'THIRTY',    'THIRTYONE', 'THIRTYTWO',  'THIRTYTHREE','THIRTYFOUR',
    'THIRTYFIVE','THIRTYSIX', 'THIRTYSEVEN','THIRTYEIGHT','THIRTYNINE',
    'FORTY',     'FORTYONE',  'FORTYTWO',   'FORTYTHREE', 'FORTYFOUR',
    'FORTYFIVE', 'FORTYSIX',  'FORTYSEVEN', 'FORTYEIGHT', 'FORTYNINE',
    'FIFTY',     'FIFTYONE',  'FIFTYTWO',   'FIFTYTHREE', 'FIFTYFOUR',
    'FIFTYFIVE', 'FIFTYSIX',  'FIFTYSEVEN', 'FIFTYEIGHT', 'FIFTYNINE'
  ];

  // 距午夜的剩余分钟数
  const total        = hours * 60 + minutes;
  const toMidnight   = 24 * 60 - total;
  const hLeft        = Math.floor(toMidnight / 60);
  const mLeft        = toMidnight % 60;

  if (mLeft === 0) {
    return `${HOUR_WORDS[hLeft]} TO MIDNIGHT`;
  }
  return `${HOUR_WORDS[hLeft]} ${MIN_WORDS[mLeft]} TO MIDNIGHT`;
}

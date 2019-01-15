import Vue from 'vue'

/**
 * @Function format 格式化日期
 * @Param formatStr String 格式 [YYYY,MM,DD,hh,mm,ss]
 */
Vue.filter('time', (value, formatStr) => {
  if (!value) {
    return ""
  }

  var formatStr = formatStr || "YYYY-MM-DD",
    date = new Date(value),
    YYYY = date.getFullYear(),
    MM = date.getMonth() + 1,
    DD = date.getDate(),
    hh = date.getHours(),
    mm = date.getMinutes(),
    ss = date.getSeconds(),
    result = formatStr;

  (MM < 10) && (MM = '0' + MM);
  (DD < 10) && (DD = '0' + DD);

  result = result.replace("YYYY", YYYY)
    .replace("MM", MM)
    .replace("DD", DD)
    .replace("hh", hh)
    .replace("mm", mm)
    .replace("ss", ss);

  return result;
})

/**
 * 后缀， 如：XX元
 * @Param label
 */
Vue.filter('money', (value, label) => {

  if (value == 'undefined' || value === "" || value == null) {
    return ""
  }
  if (!label) {
    label = '';
  }
  var numberTmp = Math.round(value * 100) / 100;

  if (isNaN(numberTmp)) {
    return value;
  }

  var numberStr = numberTmp.toString(),
    divide = numberStr.split("."),
    integer = divide[0],
    decimal = divide[1] || '00',
    len = integer.length,
    result = "",
    i = 0;

  while (len) {
    result += integer[--len];
    i++;
    if (!(i % 3) && len) {
      result += ",";
      i = 0;
    }
  }
  result = result.split("").reverse().join("");

  if (decimal.length == 1) {
    decimal += '0';
  }
  // if (decimal.length > 2) {
  //     decimal = decimal.subString(0, 2);
  // }
  result += "." + decimal;

  return label + result 
})

/**
 * @Description 身份证号遮挡
 * @Param start Number 开始位置
 * @Param len Number 长度
 */
Vue.filter('idCard', (value, start, len) => {
  if (!value) {
    return ""
  }

  let val = value.replace(/\s+/g, ""),
    result = "",
    maxLen = 18 - start
  if (!/^\d{17}[\dX]$/.test(val)) {
    return ""
  }
  if (start > 18) {
    return value
  }

  result = val.substring(0, start)
  maxLen = maxLen < len ? maxLen : len
  while (maxLen--) {
    result += "*"
  }

  result += val.substring(start + len, 18)

  return result
})

/**
 * @Description 手机号遮挡
 * @Param start Number 开始位置
 * @Param end Number 结束位置
 */
Vue.filter('phoneNum', (value, start, end) => {
  if (!value) {
    return ""
  }

  let val = value.replace(/\s+/g, ""),
    result = "",
    valLen = val.length,
    startLen = valLen - start - end
  if (!/^(\+\d{1,4})?1[3|4|5|7|8|9]\d{9}$/.test(val)) {
    return ""
  }
  if (startLen < 0) {
    return value
  }

  result = val.substring(0, start)
  while (startLen--) {
    result += "*"
  }

  result += val.substring(valLen - end, valLen)

  return result
})

Vue.filter('trim', (value, start, end) => {
  if (!value) {
    return ""
  }
  return value.trim()
})

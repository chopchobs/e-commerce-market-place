import numeral from "numeral";
export const numberFormat = (num) => {
  return numeral(num).format("0,000.00");
};
export default numberFormat;

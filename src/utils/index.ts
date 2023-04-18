import { BigNumberish } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";

export const convertTimestampToDateTime = (timestamp: number) => {
    var date_ob = new Date(timestamp * 1000);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    var hours = ("0" + date_ob.getHours()).slice(-2);
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);
    var result =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    return result;
};

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 4,
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay)

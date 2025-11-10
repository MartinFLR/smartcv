import { CHAR_HYPHEN } from '@taiga-ui/cdk/constants';
import { tuiRoundWith } from '@taiga-ui/cdk/utils/math';
import { TUI_DEFAULT_NUMBER_FORMAT } from '@taiga-ui/core/tokens';
import { tuiIsNumber } from '@taiga-ui/cdk/utils/miscellaneous';

/**
 * Convert number to string with replacing exponent part on decimals
 *
 * @param value the number
 * @return string representation of a number
 */
function tuiNumberToStringWithoutExp(value) {
    const valueAsString = String(value);
    const [numberPart, expPart] = valueAsString.split('e-');
    let valueWithoutExp = valueAsString;
    if (expPart) {
        const [, fractionalPart = ''] = numberPart?.split('.') ?? [];
        const decimalDigits = Number(expPart) + (fractionalPart?.length || 0);
        valueWithoutExp = value.toFixed(decimalDigits);
    }
    return valueWithoutExp;
}

/**
 * Return fractional part of number
 *
 * @param value the number
 * @param precision number of digits of decimal part, null to keep untouched
 * @return the fractional part of number
 */
function tuiGetFractionPartPadded(value, precision) {
    const [, fractionPartPadded = ''] = tuiNumberToStringWithoutExp(value).split('.');
    return tuiIsNumber(precision)
        ? fractionPartPadded.slice(0, Math.max(0, precision))
        : fractionPartPadded;
}

/**
 * Formats number adding a thousand separators and correct decimal separator
 * padding decimal part with zeroes to given length
 *
 * @param value the input number
 * @param settings See {@link TuiNumberFormatSettings}
 * @return the formatted string
 */
function tuiFormatNumber(value, settings = {}) {
    const { precision, decimalSeparator, thousandSeparator, decimalMode, rounding } = {
        ...TUI_DEFAULT_NUMBER_FORMAT,
        decimalMode: 'always',
        precision: Infinity,
        ...settings,
    };
    const rounded = Number.isFinite(precision)
        ? tuiRoundWith({ value, precision, method: rounding })
        : value;
    const integerPartString = String(Math.floor(Math.abs(rounded)));
    let fractionPartPadded = tuiGetFractionPartPadded(rounded, precision);
    const hasFraction = Number(fractionPartPadded) > 0;
    if (Number.isFinite(precision)) {
        if (decimalMode === 'always' || (hasFraction && decimalMode === 'pad')) {
            const zeroPaddingSize = Math.max(precision - fractionPartPadded.length, 0);
            const zeroPartString = '0'.repeat(zeroPaddingSize);
            fractionPartPadded = `${fractionPartPadded}${zeroPartString}`;
        }
        else {
            fractionPartPadded = fractionPartPadded.replace(/0*$/, '');
        }
    }
    const remainder = integerPartString.length % 3;
    const sign = value < 0 ? CHAR_HYPHEN : '';
    let result = sign + integerPartString.charAt(0);
    for (let i = 1; i < integerPartString.length; i++) {
        if (i % 3 === remainder && integerPartString.length > 3) {
            result += thousandSeparator;
        }
        result += integerPartString.charAt(i);
    }
    return fractionPartPadded ? result + decimalSeparator + fractionPartPadded : result;
}

/**
 * Converts a string to an HSL color
 * @param value string to convert
 * @return HSL color string
 */
// @bad TODO: convert stringHashToHsl to stringHashToRgb
function tuiStringHashToHsl(value) {
    if (value === '') {
        return '';
    }
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash;
    }
    const hue = hash % 360;
    const saturation = 60 + (hash % 5);
    const lightness = 80 + (hash % 5);
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}

/**
 * Generated bundle index. Do not edit.
 */

export { tuiFormatNumber, tuiGetFractionPartPadded, tuiNumberToStringWithoutExp, tuiStringHashToHsl };
//# sourceMappingURL=taiga-ui-core-utils-format.mjs.map

import {FontDefinitions} from "../FontDefinitions";
import {KeyValuePair} from "../../../Core/System/Collections/Generic/KeyValuePair";

export class CssExtensionMethods {
    public static calculateFontWeight(textStyle: TextStyle): string {

        for (let i: number = 0; i < FontDefinitions.fontWeights.length; i++) {
            let fontWeight: KeyValuePair<string, number> = FontDefinitions.fontWeights[i];
            if (textStyle.fontName.style.toLocaleLowerCase().indexOf(fontWeight.key.toLocaleLowerCase()) > -1) {
                return `font-weight:${fontWeight.value};`;
            }
        }
        return `font-weight:${400};`;
    }

    public static calculateFontStyle(textStyle: TextStyle): string {
        return `font-style: ${textStyle.fontName.style.toLocaleLowerCase().indexOf("italic") > -1 ? "italic" : "normal"};`;
    }

    public static calculateTextDecoration(textStyle: TextStyle): string {
        let value: string = "";
        switch (textStyle.textDecoration) {
            case "STRIKETHROUGH":
                value = "line-through";
                break;
            case "UNDERLINE":
                value = "underline";
                break;
            default:
                value = "none";
        }
        return `text-decoration:${value};`;
    }

    public static calculateFontFamily(textStyle: TextStyle): string {
        return `font-family:  ${textStyle.fontName.family};`;
    }

    public static calculateFontSize(textStyle: TextStyle): string {
        return `font-size:${textStyle.fontSize}px;`;
    }

    public static normalizeName(textStyle: TextStyle): string {
        return textStyle.name.replace("/", "_");
    }

    public static toCss(textStyle: TextStyle): string {
        return `.${this.normalizeName(textStyle)} { 
            ${CssExtensionMethods.calculateFontFamily(textStyle)} 
            ${CssExtensionMethods.calculateFontStyle(textStyle)} 
            ${CssExtensionMethods.calculateFontWeight(textStyle)}
            ${CssExtensionMethods.calculateTextDecoration(textStyle)} 
            ${CssExtensionMethods.calculateFontSize(textStyle)} 
        }`;
    }

    public static toScss(textStyle: TextStyle): string {
        return CssExtensionMethods.toCss(textStyle);
    }
}
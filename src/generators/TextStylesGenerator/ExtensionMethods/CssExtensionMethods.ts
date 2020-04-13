import {TextStylesGenerator} from "../TextStylesGenerator";
import {FontDefinitions} from "../FontDefinitions";
import {KeyValuePair} from "../../../Core/System/Collections/Generic/KeyValuePair";

export class CssExtensionMethods {
    public static calculateFontWeight(textStyle: TextStyle): string {

        for (let i: number = 0; i < FontDefinitions.fontWeights.length; i++) {
            let fontWeight: KeyValuePair<string, number> = FontDefinitions.fontWeights[i];
            if (textStyle.fontName.style.toLocaleLowerCase().indexOf(fontWeight.key.toLocaleLowerCase()) > -1) {
                return fontWeight.value;
            }
        }
        return 400;
    }

    public static calculateFontStyle(textStyle: TextStyle): string {
        return textStyle.fontName.style.toLocaleLowerCase().indexOf("italic") > -1 ? "italic" : "normal";
    }

    public static calculateTextDecoration(textStyle: TextStyle): string {
        switch (textStyle.textDecoration) {
            case "STRIKETHROUGH":
                return "line-through";
            case "UNDERLINE":
                return "underline";
            default:
                return "none";
        }
    }
}
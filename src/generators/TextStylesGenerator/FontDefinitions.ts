import {KeyValuePair} from "../../Core/System/Collections/Generic/KeyValuePair";

export class FontDefinitions {
    public static fontWeights: KeyValuePair<string, number>[] = [
        new KeyValuePair<string, number>("thin", 100),
        new KeyValuePair<string, number>("extra light", 200),
        new KeyValuePair<string, number>("light", 300),
        new KeyValuePair<string, number>("regular", 400),
        new KeyValuePair<string, number>("normal", 400),
        new KeyValuePair<string, number>("medium", 500),
        new KeyValuePair<string, number>("semi bold", 600),
        new KeyValuePair<string, number>("bold", 700),
        new KeyValuePair<string, number>("extra bold", 800),
        new KeyValuePair<string, number>("black", 900),
        new KeyValuePair<string, number>("extra black", 950)
    ];

    public static textDecorations: KeyValuePair<string, string>[] = [
        new KeyValuePair<string, string>("none", "none"),
        new KeyValuePair<string, string>("underline", "underline"),
        new KeyValuePair<string, string>("strikethrough", "line-through")
    ];
}
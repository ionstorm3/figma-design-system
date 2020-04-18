import {ModelBase} from "../../../Core/Models/ModelBase";

export class ColorStyle extends ModelBase {

    constructor(paintStyle:PaintStyle) {
        super(paintStyle);
    }

    public blue: number = 0;
    public green: number = 0;
    public red: number = 0;
    public alpha: number = 0;
}
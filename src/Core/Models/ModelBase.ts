export class ModelBase {
    constructor(baseStyle?: BaseStyle) {
        if (Object.isNull(baseStyle)) {
            return;
        }
        this.name = baseStyle.name;
        this.description = baseStyle.description;
    }

    public name: string = String.empty;
    public description: string = String.empty;
}
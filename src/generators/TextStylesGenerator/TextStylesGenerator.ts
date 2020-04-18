import {GeneratorBase} from "../GeneratorBase";
import {CssExtensionMethods} from "./ExtensionMethods/CssExtensionMethods";

export class TextStylesGenerator extends GeneratorBase<TextStyle> {


    //#region Properties

    protected name: string = "Text Styles";

    //#endregion

    //#region Methods

    public async initializeAsync(): Promise<void> {
        await super.initializeAsync();
        await this.loadStylesAsync();
        this.createStyleNodes();
        this.focus();
    }

    private async loadStylesAsync(): Promise<void> {
        console.log("loadStylesAsync");
        console.log("loading fonts...");
        await figma.loadFontAsync({family: "Roboto", style: "Regular"});
        await figma.loadFontAsync({family: "Roboto", style: "Light"});

        console.log("fonts loaded.");
        console.log("Retrieving text styles...");
        this.styles = figma.getLocalTextStyles();
        console.log("styles:");
        console.log(this.styles);
    }

    private createStyleNodes(): void {
        this.styles.forEach((style: TextStyle, index: number) => {
            this.createStyleNode(style);
        });

        this.node.resize(this.xMax + this.padding * 2, this.y);
        console.log("node children:");
        console.log(this.node);
    }

    private createStyleNode(textStyle: TextStyle): void {
        //Create the frame
        let frameNode: FrameNode = figma.createFrame();
        frameNode.name = textStyle.name;
        frameNode.y = this.y;
        frameNode.x = this.padding;

        //Create the title text
        let titleNode: TextNode = figma.createText();
        titleNode.name = `${textStyle.name} - Title`;
        titleNode.characters = textStyle.name;
        titleNode.textStyleId = textStyle.id;
        titleNode.y = 0;

        //Create the css text
        let cssNode: TextNode = figma.createText();
        cssNode.name = `${textStyle.name} - CSS`;
        cssNode.characters = CssExtensionMethods.toCss(textStyle);
        cssNode.fontName = {family: "Roboto", style: "Light"};
        cssNode.fontSize = 12;
        cssNode.y = titleNode.height;
        cssNode.opacity = 0.50;

        let width: number = cssNode.width > titleNode.width ? cssNode.width : titleNode.width;

        if (width > this.xMax) {
            this.xMax = width;
        }

        this.y = this.y + (titleNode.height + cssNode.height) + this.spacing;

        frameNode.resize(width, titleNode.height + cssNode.height);

        frameNode.appendChild(titleNode);
        frameNode.appendChild(cssNode);
        console.log("appending frame node:");
        console.log(frameNode);
        this.node.insertChild(0, frameNode);
    }

    //#endregion

}
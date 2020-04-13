import {GeneratorBase} from "../GeneratorBase";
import {CssExtensionMethods} from "./ExtensionMethods/CssExtensionMethods";

export class TextStylesGenerator extends GeneratorBase {

    private m_frameNode: FrameNode = figma.createFrame();
    private m_x: number = 20;
    private m_y: number = 20;
    private m_margin: number = 20;
    private m_largestWidth: number = 0;

    //#region Properties

    public get frame(): FrameNode {
        return this.m_frameNode;
    }

    public frameName: string = "Text Styles";

    //#endregion

    public async initializeAsync(): Promise<void> {
        console.log("initializeAsync");
        this.initializeFrame();
        await this.loadStylesAsync();
        this.scrollIntoView();
    }

    public initializeFrame(): void {
        console.log("initializeFrame");

        //Create the frame
        this.createFrame();
    }

    public createFrame(): void {
        console.log("createFrame...");
        this.m_frameNode.name = this.frameName;
        this.root.appendChild(this.m_frameNode);
        console.log("frame created.");
    }

    private async loadStylesAsync(): Promise<void> {
        console.log("loadStylesAsync");
        console.log("loading fonts...");
        await figma.loadFontAsync({family: "Roboto", style: "Regular"});
        await figma.loadFontAsync({family: "Roboto", style: "Light"});

        console.log("fonts loaded.");
        console.log("Retrieving text styles...");
        let textStyles: TextStyle[] = figma.getLocalTextStyles();
        console.log("text styles retrieved.");

        let x: number = 20;
        let y: number = 20;
        let largestWidth: number = 0;

        textStyles.forEach((textStyle: TextStyle) => {
            this.createSection(textStyle);
            // let titleNode: TextNode = figma.createText();
            // titleNode.name = `${textStyle.name}`;
            // titleNode.characters = textStyle.name;
            // titleNode.textStyleId = textStyle.id;
            // titleNode.x = x;
            // titleNode.y = y;
            // y = y + titleNode.height + 24 /*padding*/;
            //
            // if (titleNode.width > largestWidth) {
            //     largestWidth = titleNode.width;
            // }
            //
            // this.frame.appendChild(titleNode);
        });
        // this.m_frameNode.resize(largestWidth + 40, y);
        //
        // console.log(`largest width: ${largestWidth}.`);

    }

    private createSection(textStyle: TextStyle): void {
        let titleNode: TextNode = figma.createText();
        titleNode.name = `${textStyle.name} Name`;
        titleNode.characters = textStyle.name;
        titleNode.textStyleId = textStyle.id;
        titleNode.x = this.m_x;
        titleNode.y = this.m_y;
        this.m_y = this.m_y + titleNode.height;

        if (titleNode.width > this.m_largestWidth) {
            this.m_largestWidth = titleNode.width;
        }

        let cssNode: TextNode = figma.createText();
        cssNode.name = `${textStyle.name} CSS`;
        cssNode.characters = `font-family: ${textStyle.fontName.family}; font-style:${CssExtensionMethods.calculateFontStyle(textStyle)}; font-weight:${CssExtensionMethods.calculateFontWeight(textStyle)}; text-decoration:${CssExtensionMethods.calculateTextDecoration(textStyle)}; font-size:${textStyle.fontSize}px;`;
        cssNode.fontName = {family: "Roboto", style: "Light"};
        cssNode.fontSize = 12;
        cssNode.x = this.m_x;
        cssNode.y = this.m_y;

        this.m_y = this.m_y + cssNode.height + 20;

        if (cssNode.width > this.m_largestWidth) {
            this.m_largestWidth = cssNode.width;
        }

        this.m_frameNode.appendChild(titleNode);
        this.m_frameNode.appendChild(cssNode);
        this.m_frameNode.resize(this.m_largestWidth + 40, this.m_y);
        console.log(`largest width: ${this.m_largestWidth}.`);

    }

    private scrollIntoView(): void {
        figma.root.appendChild(this.root);
        figma.currentPage = this.root;
        figma.viewport.scrollAndZoomIntoView(this.root.children);
        figma.closePlugin();
    }
}
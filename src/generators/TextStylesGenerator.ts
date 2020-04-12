import {GeneratorBase} from "./GeneratorBase";

export class TextStylesGenerator extends GeneratorBase {

    private m_frameNode: FrameNode = figma.createFrame();

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
        console.log("createFrame");
        this.m_frameNode.name = this.frameName;
        this.root.appendChild(this.m_frameNode);
    }

    private async loadStylesAsync(): Promise<void> {
        console.log("loadStylesAsync");
        console.log("loading fonts...");
        await figma.loadFontAsync({family: "Roboto", style: "Regular"});
        console.log("fonts loaded.");
        console.log("Retrieving text styles...");
        let textStyles: TextStyle[] = figma.getLocalTextStyles();
        console.log("text styles retrieved.");

        let x: number = 20;
        let y: number = 20;
        let largestWidth: number = 0;

        textStyles.forEach((textStyle: TextStyle) => {
            let titleNode: TextNode = figma.createText();
            titleNode.name = `${textStyle.name} - Title`;
            titleNode.characters = textStyle.name;
            titleNode.textStyleId = textStyle.id;
            titleNode.x = x;
            titleNode.y = y;
            y = y + titleNode.height + 24 /*padding*/;

            if (titleNode.width > largestWidth) {
                largestWidth = titleNode.width;
            }

            this.frame.appendChild(titleNode);
        });
        this.m_frameNode.resize(largestWidth + 40, y);

        console.log(`largest width: ${largestWidth}.`);

    }

    private createText(): void {

    }

    private scrollIntoView(): void {
        console.log("scrollIntoView...");
        figma.root.appendChild(this.root);
        figma.currentPage = this.root;
        figma.viewport.scrollAndZoomIntoView(this.root.children);
    }
}
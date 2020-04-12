var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GeneratorBase } from "./GeneratorBase";
export class TextStylesGenerator extends GeneratorBase {
    constructor() {
        super(...arguments);
        this.m_frameNode = figma.createFrame();
        this.frameName = "Text Styles";
    }
    //#region Properties
    get frame() {
        return this.m_frameNode;
    }
    //#endregion
    initializeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("initializeAsync");
            this.initializeFrame();
            yield this.loadStylesAsync();
            this.scrollIntoView();
        });
    }
    initializeFrame() {
        console.log("initializeFrame");
        //Create the frame
        this.createFrame();
    }
    createFrame() {
        console.log("createFrame");
        this.m_frameNode.name = this.frameName;
        this.root.appendChild(this.m_frameNode);
    }
    loadStylesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("loadStylesAsync");
            console.log("loading fonts...");
            yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
            console.log("fonts loaded.");
            console.log("Retrieving text styles...");
            let textStyles = figma.getLocalTextStyles();
            console.log("text styles retrieved.");
            let x = 20;
            let y = 20;
            let largestWidth = 0;
            textStyles.forEach((textStyle) => {
                let titleNode = figma.createText();
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
        });
    }
    createText() {
    }
    scrollIntoView() {
        console.log("scrollIntoView...");
        figma.root.appendChild(this.root);
        figma.currentPage = this.root;
        figma.viewport.scrollAndZoomIntoView(this.root.children);
    }
}

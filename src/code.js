// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
import { TextStylesGenerator } from "./generators/TextStylesGenerator";
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //     const nodes: SceneNode[] = [];
    //     for (let i = 0; i < msg.count; i++) {
    //         const rect = figma.createRectangle();
    //         rect.x = i * 150;
    //         rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //         figma.currentPage.appendChild(rect);
    //         nodes.push(rect);
    //     }
    //     figma.currentPage.selection = nodes;
    //     figma.viewport.scrollAndZoomIntoView(nodes);
    //
    // }
    if (msg.type === "create-rectangles") {
        let textStylesGenerator = new TextStylesGenerator();
        yield textStylesGenerator.initializeAsync();
        // let results: SceneNode[] = figma.currentPage.findAll(node => node.type === "TEXT" && node.visible == true);
        // console.log("results:");
        // console.log(results);
        // let solidPaintStyles: PaintStyle[] = figma.getLocalPaintStyles().filter(paintStyle => paintStyle.paints[0].type === "SOLID");
        // //
        // console.log("solidPaintStyles:");
        // console.log(solidPaintStyles);
        //
        // let textStyles: TextStyle[] = figma.getLocalTextStyles();
        // // console.log("textStyles:");
        // // console.log(textStyles);
        // //
        // // let count: number = 0;
        //
        // let idx: number = textStyles.findIndex((x: TextStyle) => {
        //     return x.name === "Text_B/Light"
        // });
        // if (idx > -1) {
        //     console.log("Found text style:")
        //     console.log(textStyles[idx]);
        // }
        // textStyles.forEach((textStyle: TextStyle) => {
        //     if (count > 0) {
        //         return;
        //     }
        //     //        let results: SceneNode[] = figma.currentPage.findAll(node => node.type === "TEXT" && node.visible == true);
        //     let txtNode: any = figma.root.findOne(node => node.type === "TEXT" && node.textStyleId === textStyle.id);
        //     console.log("txtNode:  ");
        //     console.log(txtNode);
        //     count++;
        // });
    }
    //const node = node.findOne(node => node.type === "TEXT" && node.characters.length > 100)
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    //figma.closePlugin();
});
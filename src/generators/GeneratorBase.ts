import {StyleSheetType} from "./Enumerations/StyleSheetType";
import {UiEventBus} from "../EventBuses/UiEventBus";

export abstract class GeneratorBase<TStyle extends BaseStyle> {

    //#region Internal fields

    private static m_root: PageNode | null = null;

    //#endregion

    protected get root(): PageNode | null {
        return GeneratorBase.m_root;
    }

    public rootName: string = "Design System";

    protected node: FrameNode | null;
    protected styles: TStyle[] = [];

    protected spacing: number = 16;
    protected padding: number = 20;

    protected x: number = 0;
    protected y: number = this.padding;
    protected xMax: number = 0;
    protected yMax: number = 0;


    protected abstract name: string;
    public styleSheetName: string = name;
    public styleSheetType: StyleSheetType.Css;

    protected createNode(): void {
        console.log("createNode...");
        this.node = figma.createFrame();
        this.node.name = this.name;
        console.log("Appending node to page root...");
        this.root.appendChild(this.node);
        console.log("Node appended to page root.");
    }

    protected findNode(): FrameNode | null {
        console.log("findNode...");
        let idx: number = this.root.children.findIndex((child: SceneNode | PageNode) => {
            return child.name === this.name;
        });
        console.log(`Node found.  idx: ${idx}`);
        return idx > -1 ? (this.root.children[idx] as FrameNode) : null;
    }

    protected initializeRoot(): void {
        //Check if the root has already been initialized
        if (this.root !== null) {
            //The root has already been initialized
            console.log("Root not initialized.");
            return;
        }

        //Determine if a the root page exists
        console.log("Finding root page index...");
        let idx: number = figma.root.children.findIndex((child: PageNode) => {
            return child.name === this.rootName;
        });
        console.log("Root page index found.");

        //The page exists.  Assign and clear the children.
        if (idx > -1) {
            console.log("The root page already exists.");
            //Assign
            GeneratorBase.m_root = figma.root.children[idx];

            console.log("root page:  ");
            console.log(GeneratorBase.m_root);

            //Clear the children of the root page.
            // GeneratorBase.m_root.children.forEach((child: SceneNode) => {
            //     child.remove();
            // });
            return;
        }

        //Create the root
        console.log("Creating the root page...");
        GeneratorBase.m_root = figma.createPage();
        GeneratorBase.m_root.name = this.rootName;
        console.log("created the root node.  Attaching...");
        figma.root.appendChild(this.root);
        console.log("root appended.");
    }

    public async initializeAsync(): Promise<void> {
        this.initializeRoot();
        this.initializeNode();
    }

    protected clearNodeChildren(): void {
        console.log("clearNodeChildren...");
        this.node.children.forEach((child: SceneNode) => {
            child.remove();
        });
    }

    protected initializeNode(): void {
        console.log("initializeNode...");
        this.node = this.findNode();
        if (this.node === null) {
            console.log("Node does not exist...");
            //The node does not exist.  Create it.
            this.createNode();
            return;
        }

        //The node already exists.  No need to recreate it.
        this.clearNodeChildren();
    }

    protected focus(): void {
        figma.currentPage = this.root;
        figma.viewport.scrollAndZoomIntoView(this.root.children);
        //figma.closePlugin();
    }

}

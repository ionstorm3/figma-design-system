export class GeneratorBase {

    //#region Internal fields
    private m_rootName: string = "Gwhr Styles";
    private m_rootPage: PageNode | null = null;

    //#region Properties

    public get root(): PageNode {
        if (this.m_rootPage === null) {
            this.initialize();
        }
        return this.m_rootPage;
    }

    public lastFrameXCoordinate: number = 0;
    public lastFrameYCoordinate: number = 0;

    //#endregion

    //#region Methods

    protected initialize(removeExisting: boolean = false): void {
        console.log("GeneratorBase.initialize...");

        let idx: number = figma.root.children.findIndex((child: PageNode) => {
            return child.name === this.m_rootName
        });

        if (idx > -1) {
            this.m_rootPage = figma.root.children[idx];
            return;
        }

        this.m_rootPage = figma.createPage();
        this.m_rootPage.name = this.m_rootName;

        if (removeExisting) {
            this.clearPage();
        }
    }

    protected clearPage(): void {
        this.m_rootPage.children.forEach((node: SceneNode) => {
            node.remove();
        });
    }

    //#endregion
}
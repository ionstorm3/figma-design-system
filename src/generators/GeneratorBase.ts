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
        let page: PageNode = figma.root.findOne((node: PageNode) => {
            return node.type === "PAGE" && node.name === this.m_rootName
        }) as PageNode;

        if (page !== undefined && page !== null) {
            this.m_rootPage = page;
            return;
        } else {
            this.m_rootPage = figma.createPage();
            this.m_rootPage.name = this.m_rootName;
        }

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
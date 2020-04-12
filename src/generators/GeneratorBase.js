export class GeneratorBase {
    constructor() {
        //#region Internal fields
        this.m_rootName = "Gwhr Styles";
        this.m_rootPage = null;
        this.lastFrameXCoordinate = 0;
        this.lastFrameYCoordinate = 0;
        //#endregion
    }
    //#region Properties
    get root() {
        if (this.m_rootPage === null) {
            this.initialize();
        }
        return this.m_rootPage;
    }
    //#endregion
    //#region Methods
    initialize(removeExisting = false) {
        let page = figma.root.findOne((node) => {
            return node.type === "PAGE" && node.name === this.m_rootName;
        });
        if (page !== undefined && page !== null) {
            this.m_rootPage = page;
            return;
        }
        else {
            this.m_rootPage = figma.createPage();
            this.m_rootPage.name = this.m_rootName;
        }
        if (removeExisting) {
            this.clearPage();
        }
    }
    clearPage() {
        this.m_rootPage.children.forEach((node) => {
            node.remove();
        });
    }
}

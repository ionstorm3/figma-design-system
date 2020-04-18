export interface IGenerator<TNode, TStyle extends BaseStyle> {

    //#region Properties

    name: string;
    description: string;
    forceOverwrite: boolean;

    //#endregion

    //#region Methods

    initializeAsync(): Promise<void>;

    initializeNode(): void;

    createNode(): void;

    clearNode(): void;

    findNode(): void;

    createCss():string;

    //#endregion
}
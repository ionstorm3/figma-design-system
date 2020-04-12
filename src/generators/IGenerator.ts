export interface IGenerator {

    //#region Properties

    name: string;
    description: string;
    forceOverwrite: boolean;

    //#endregion

    //#region Methods

    executeAsync(): Promise<void>;

    //#endregion
}
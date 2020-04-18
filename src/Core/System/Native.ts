interface StringConstructor {
    empty: string;

    isNullOrEmpty(arg: any): boolean;
}

String.empty = "";

String.isNullOrEmpty = (arg: any): boolean => {
    return typeof arg === "undefined" || arg === null || arg === "";
};

interface ObjectConstructor {
    isNull(arg: any): boolean;
}

Object.isNull = (arg: any): boolean => {
    return typeof arg === "undefined" || arg === null;
}
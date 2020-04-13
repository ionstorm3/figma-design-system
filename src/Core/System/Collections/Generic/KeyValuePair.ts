export class KeyValuePair<TKey, TValue> {

    //#region Internal fields

    private m_key: TKey = {} as TKey;
    private m_value: TValue = {} as TValue;

    //#endregion

    public constructor(key: TKey, value: TValue) {
        this.m_key = key;
        this.m_value = value;
    }

    public get key(): TKey {
        return this.m_key;
    }

    public get value(): TValue {
        return this.m_value;
    }
}
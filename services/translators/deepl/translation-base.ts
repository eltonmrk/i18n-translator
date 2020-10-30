import {Language, Translation} from "../../../models/translation-view.ts";

export abstract class TranslationBase {
    abstract getLanguages(): Promise<Language[]>;
    abstract translate(sourceLang: string, targetLang: string, text: string): Promise<Translation | undefined>;
}
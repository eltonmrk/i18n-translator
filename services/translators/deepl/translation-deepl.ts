import DeeplClient from "../../../clients/deepL/deepl-client.ts";
import {TranslationBase} from "./translation-base.ts";
import {Language, Translation} from "../../../models/translation-view.ts";
import {LanguageSto} from "../../../clients/deepL/sto/language-sto.ts";
import {TranslationsSto} from "../../../clients/deepL/sto/translations-sto.ts";

export default class TranslationDeepl extends TranslationBase{
    private deeplClient = new DeeplClient();

    getLanguages(): Promise<Language[]> {
        return this.deeplClient.languages().then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(jsonData => {
            return (jsonData as LanguageSto[]).map(item => ({
                language: item.language,
                name: item.name
            } as Language));
        });
    }

    translate(sourceLang: string, targetLang: string, text: string): Promise<Translation | undefined> {
        return this.deeplClient.translate(sourceLang, targetLang, text).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(jsonData => {
            return (jsonData as TranslationsSto).translations!.map(item => ({
                text: item.text
            } as Translation)).shift();
        });
    }
}

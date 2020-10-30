import xmldom from 'https://dev.jspm.io/xmldom';
import * as log from 'https://deno.land/std/log/mod.ts';
import XmlFormatter from "https://dev.jspm.io/xml-formatter";
import {TranslationsSto} from "../clients/deepL/sto/translations-sto.ts";
import TranslationDeepl from "./translators/deepl/translation-deepl.ts";

// @ts-ignore
const DOMParser = xmldom.DOMParser;
// @ts-ignore
const XMLSerializer = xmldom.XMLSerializer;

export class XmlService {
    private translationDeepl: TranslationDeepl;

    constructor() {
        this.translationDeepl = new TranslationDeepl();
    }


    async processAndTranslateSources(
        fileContent: string,
        sourceLanguage: string,
        targetLanguage: string,
        logging?: boolean) {
        const domDocument = new DOMParser().parseFromString(fileContent);
        const transUnits: Array<any> = domDocument.getElementsByTagName('trans-unit');
        for (var i = 0; i < transUnits.length; i++) {
            const text = transUnits[i].getElementsByTagName('source')[0].childNodes[0].data;
            log.info(`${i + 1} of ${transUnits.length}`);
            try {
                let translatedText = await this.translationDeepl.translate(sourceLanguage, targetLanguage, text);
                const targetElement = domDocument.createElement("target");
                targetElement.textContent = translatedText!.text;
                if (logging) {
                    log.info(`[${sourceLanguage}]: '${text}' ⮕`);
                    log.info(`[${targetLanguage}]: ${targetElement.textContent}`)
                    log.info('-----------------------------------------------');
                }
                transUnits[i].insertBefore(targetElement, transUnits[i].getElementsByTagName('context-group')[0]);
            } catch(e) {
                log.error(e);
                break;
            }
        }
        // @ts-ignore
        return XmlFormatter(new XMLSerializer().serializeToString(domDocument));
    }
}
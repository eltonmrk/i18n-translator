import {XmlService} from './xml-service.ts';
import * as file from 'https://deno.land/std/fs/mod.ts'

export default class TranslationService {
    async translateXlf(
        sourceLanguage: string,
        targetLanguage: string,
        pathXlf: string,
        pathTargetFolder: string) {
        const text = Deno.readTextFileSync(pathXlf);
        const data = await new XmlService().processAndTranslateSources(text, sourceLanguage, targetLanguage, true);
        file.ensureDirSync(pathTargetFolder);
        const targetFile = `${pathTargetFolder}/${this.generateXlfFileName(targetLanguage)}`;
        Deno.writeTextFile(targetFile, data);
    }

    generateXlfFileName(targetLanguage: string): string {
        return `messages.${targetLanguage.toLowerCase()}.xlf`;
    }
}
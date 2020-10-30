import TranslationService from "./services/translation-service.ts";
import PromptService from "./services/prompt-service.ts";
import * as log from 'https://deno.land/std/log/mod.ts';
import * as file from 'https://deno.land/std/fs/mod.ts'
import {config} from 'https://deno.land/x/dotenv/mod.ts';
import TranslationDeepl from "./services/translators/deepl/translation-deepl.ts";

export default class Main {
    private translationService: TranslationService;
    private translationDeepl: TranslationDeepl;
    private promptService: PromptService;

    constructor() {
        this.translationService = new TranslationService();
        this.translationDeepl = new TranslationDeepl();
        this.promptService = new PromptService();
    }

    async init() {
        const languages = await this.translationDeepl.getLanguages();
        const sourceLanguage = await this.promptService.ask(languages, 'Source language?');
        const targetLanguage = await this.promptService.ask(languages, 'Target language?');
        if (file.existsSync(config().CONFIG_SOURCE_FILE)) {
            log.info(`✔ Found xlf file ${config().CONFIG_SOURCE_FILE}.`);
        } else {
            log.error(`XLF file ${config().CONFIG_SOURCE_FILE} not found.`);
        }
        log.info(`Start translation ${sourceLanguage} -> ${targetLanguage}`);
        this.translationService.translateXlf(
            sourceLanguage,
            targetLanguage,
            config().CONFIG_SOURCE_FILE,
            config().CONFIG_TARGET_PATH);
    }
}
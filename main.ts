import TranslationService from "./services/translation-service.ts";
import PromptService from "./services/prompt-service.ts";
import * as log from 'https://deno.land/std/log/mod.ts';
import TranslationDeepl from "./services/translators/deepl/translation-deepl.ts";
import {ConfigService} from "./services/config.service.ts";

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
        this.checkConfig();
        const languages = await this.translationDeepl.getLanguages();
        const sourceLanguage = await this.promptService.ask(languages, 'Source language?');
        const targetLanguage = await this.promptService.ask(languages, 'Target language?');
        if (ConfigService.getConfigKey('CONFIG_SOURCE_FILE')) {
            log.info(`✔ Found xlf file ${ConfigService.getConfigKey('CONFIG_SOURCE_FILE')}.`);
        } else {
            log.error(`XLF file env variable 'CONFIG_SOURCE_FILE' not found.`);
        }
        log.info(`Start translation ${sourceLanguage} -> ${targetLanguage}`);
        this.translationService.translateXlf(
            sourceLanguage,
            targetLanguage,
            ConfigService.getConfigKey('CONFIG_SOURCE_FILE'),
            ConfigService.getConfigKey('CONFIG_TARGET_PATH'));
    }

    checkConfig() {
        if (!ConfigService.getConfigKey('CONFIG_SOURCE_FILE') &&
            !ConfigService.getConfigKey('CONFIG_TARGET_PATH')) {
            throw("Please add configuration in .env");
        }
    }
}
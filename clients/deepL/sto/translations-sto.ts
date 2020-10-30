export interface TranslationsSto {
    translations?: TranslationSto[];
}

export interface TranslationSto {
    detected_source_language?: string;
    text?: string;
}
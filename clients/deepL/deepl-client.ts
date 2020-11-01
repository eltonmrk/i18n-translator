import {ConfigService} from "../../services/config.service.ts";

export default class DeeplClient {
    public languages(): Promise<Response> {
        return fetch(
            `https://api.deepl.com/v2/languages?auth_key=${ConfigService.getConfigKey('DEEPL_AUTH_KEY')}`, {
                method: 'POST'
            }
        );
    }

    public translate(source_lang: string, target_lang: string, text: string): Promise<Response> {
        return fetch(
            `https://api.deepl.com/v2/translate?auth_key=${ConfigService.getConfigKey('DEEPL_AUTH_KEY')}&target_lang=${target_lang}&source_lang=${source_lang}&text=${text}`,{
                method: 'POST'
            }
        );
    }
}
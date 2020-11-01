import {config} from 'https://deno.land/x/dotenv/mod.ts';
export class ConfigService {
    static getConfigKey(key: string) {
        if (file.existsSync(config()[key])) {
            return file.existsSync(config()[key]);
        } else if (Deno.env.get(key)) {
            return Deno.env.get(key);
        }
    }
}
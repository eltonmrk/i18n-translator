import {config} from 'https://deno.land/x/dotenv/mod.ts';
export class ConfigService {
    static getConfigKey(key: string): string {
        if (config()[key]) {
            return config()[key];
        } else if (Deno.env.get(key)) {
            return Deno.env.get(key)!;
        }
        return '';
    }
}
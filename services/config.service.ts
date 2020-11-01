import {config} from 'https://deno.land/x/dotenv/mod.ts';

// deno eval "console.log(Deno.env.toObject())"

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
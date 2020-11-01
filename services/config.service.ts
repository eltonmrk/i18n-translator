import {config} from 'https://deno.land/x/dotenv/mod.ts';

// deno eval "console.log(Deno.env.toObject())"

export class ConfigService {
    static getConfigKey(key: any): string {
        if (config()[key]) {
            return config()[key];
        } else if (Deno.env.get(key)) {
            return Deno.env.get(key)!;
        } else if (ConfigService.getDenoArg(key)) {
            return ConfigService.getDenoArg(key);
        }
        return '';
    }

    static getDenoArg(key: string) {
        for(var i = 0; i < Deno.args.length; i++) {
            const keyValuePair = Deno.args[i].split('=');
            if (keyValuePair[0] === key) {
                return keyValuePair[1];
            }
        }
        return '';
    }
}
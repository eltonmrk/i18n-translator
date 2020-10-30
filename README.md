# xlf-translator - when translation have to go fast

XLF is an xml based format that is used in practice to translate software into different languages.

The motivation behind this project is the automated translation of these XLF files into different languages. 

What is the concrete benefit?
* Target group specific languages are supported.
* Automated translation via cloud services.

The motivation behind this project is the automated translation of these XLF files into different languages. The project is based on [Deno](https://deno.land/).

## Installation

First, Deno must be installed. Then execute the following command to install the application locally:
```
deno install --unstable -f --allow-read --allow-net https://deno.land/x/xlf_translator@0.1/index.ts
```
## Configuration

Create an `.env` file in the project folder. It should contain the following entries.

```
DEEPL_AUTH_KEY=Authentication Key from DeepL
CONFIG_SOURCE_FILE=Path to message file, e.g. ./languageFolder/messages.xlf
CONFIG_TARGET_PATH=Path to parent folder of generated file, e.g. ./languageFolder/generated
```
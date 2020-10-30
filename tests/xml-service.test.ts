import xmldom from 'https://dev.jspm.io/xmldom';
import {assert} from 'https://deno.land/std/testing/asserts.ts';
import {XmlService} from "../services/xml-service.ts";
// @ts-ignore
const DOMParser = xmldom.DOMParser;

Deno.test({
    name: "Test target translation is generated",
    async fn() {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(await Deno.readFile('./mock/messages.xlf'));
        const result = new XmlService().processAndTranslateSources(text, 'DE', 'EN');
        const domDocument = new DOMParser().parseFromString(result);
        const transUnits:Array<any> = domDocument.getElementsByTagName('trans-unit');
        assert(transUnits.length > 0);
        for (var i = 0; i < transUnits.length; i++) {
            const targetNode = transUnits[i].getElementsByTagName('target')[0];
            const targetNodeText = targetNode.childNodes[0].data;
            assert(targetNode);
            assert(targetNodeText);
        }
    },
});
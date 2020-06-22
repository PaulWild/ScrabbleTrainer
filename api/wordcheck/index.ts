import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.CosmosEndpoint;
const key = process.env.CosmosKey;
const client = new CosmosClient({endpoint, key});

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface Words {
    id: string,
    length: number
    words: [string]
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const wordList = (req.query.word);
    const dict = (req.query.dict);

    if (!wordList || !dict ) {
        context.res = {
            status: 400,
            body: "specify words and dictionary"
        };
        context.done()
        return;
    }

    const database  = client.database("scrabbletrainer");
    const container = database.container(`${dict}_dictionary`);

    const words =wordList.split(',').map(x => x.toUpperCase())

    for(var i =0; i<words.length; i++) {
        const word = words[i]
        const result = await container.item(word.length.toString(), word[0]).read<Words>();
        if (!(result.resource && result.resource.words.includes(word))) {
            context.res.headers["Cache-Control"] = "public, max-age=31536000, immutable, no-custom"
            context.res = {
                body: false,
                headers: {
                    ...context.res.headers,
                    "Cache-Control": "public, max-age=31536000, immutable, no-custom"
                }
            };   

            context.done()
            return;          
        }
    }

    context.res.headers["Cache-Control"] = "public, max-age=31536000, immutable, no-custom"
    context.res = {
        body: true,
        headers: {
            ...context.res.headers,
            "Cache-Control": "public, max-age=31536000, immutable, no-custom"
        }
    };
    context.done()
    return;
  
};

export default httpTrigger;

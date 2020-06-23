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
    const startsWith = (req.query.startsWith);
    const length = (req.query.length);
    const dict = (req.query.dict);

    if (!length || !startsWith || !Number(length) || !dict ) {
        context.res = {
            status: 400,
            body: "specify length, first letter and dictionary"
        };
        context.done()
        return;
    }

    const database  = client.database("scrabbletrainer");
    const container = database.container(`${dict}_dictionary`);

    let words: string[] = []
    if (startsWith === "_") {
        const repsonse = await container.items.query<{words: string[]}>(`SELECT c.words FROM c WHERE c.id = '${length}'`).fetchAll();
        words = repsonse.resources.flatMap(x => x.words);
    }
    else {
        const result = await container.item(length, startsWith.split('')[0]).read<Words>();
        words = result.resource ? result.resource.words : []
        words = words.filter(x => x.startsWith(startsWith)).sort()
    }

    context.res.headers["Cache-Control"] = "public, max-age=31536000, immutable, no-custom"
    context.res = {
        body: words,
        headers: {
            ...context.res.headers,
            "Cache-Control": "public, max-age=31536000, immutable, no-custom"
        }
    };
    context.done()
    return;
  
};

export default httpTrigger;

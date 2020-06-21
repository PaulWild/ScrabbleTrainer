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
    const firstLetter = (req.query.letter);
    const length = (req.query.length);
    const dict = (req.query.dict);

    if (!length || !firstLetter || !Number(length) || !dict ) {
        context.res = {
            status: 400,
            body: "specify length, first letter and dictionary"
        };
        context.done()
        return;
    }
    const database  = client.database("scrabbletrainer");
    const container = database.container(`${dict}_dictionary`);

    const result = await container.item(length, firstLetter).read<Words>();

    context.res.headers["Cache-Control"] = "public, max-age=31536000, immutable, no-custom"
    context.res = {
        body: result.resource ? result.resource.words : [],
        headers: {
            ...context.res.headers,
            "Cache-Control": "public, max-age=31536000, immutable, no-custom"
        }
    };
    context.done()
    return;
  
};

export default httpTrigger;

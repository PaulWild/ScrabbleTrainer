import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.CosmosEndpoint;
const key = process.env.CosmosKey;
const client = new CosmosClient({endpoint, key});

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface Anagram {
    id: string,
    words: [string]
}

const primeNumbersMap: { [id: string] : number[]; } = 
{
    A:	[2],
    B:	[3],
    C:	[5],
    D:	[7],
    E:	[11],
    F:	[13],
    G:	[17],
    H:	[19],
    I:	[23],
    J:	[29],
    K:	[31],
    L:	[37],
    M:	[41],
    N:	[43],
    O:	[47],
    P:	[53],
    Q:	[59],
    R:	[61],
    S:	[67],
    T:	[71],
    U:	[73],
    V:	[79],
    W:	[83],
    X:	[89],
    Y:	[97],
    Z:	[101],
    _: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101]
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const word = (req.query.word);
    const dict = (req.query.dict);
    const database  = client.database("scrabbletrainer");
    const  container = database.container(`${dict}_anagrams`);

    if (word) {

        if (word.length >10) {
            context.res = {
                status: 400,
                body: "Please only use up to 10 letters"
            };
            context.done()
            return;           
        }
        if (word.split('').filter(x => x === "_").length > 2) {
            context.res = {
                status: 400,
                body: "Please only use up to two blanks"
            };
            context.done()
            return;
        }

        var ids = word.split('').map(x => primeNumbersMap[x.toUpperCase()]      
        ).reduce((prev, curr) => prev.flatMap(x => curr.flatMap(y => x * y))).map(x => x.toString());

        const results: string[] = []
        if (ids.length === 1) {
            const result = await container.item(ids[0], ids[0]).read<Anagram>();
            const words = result.resource ? result.resource.words : [];
            results.push(...words)
        }
        else {
            const repsonse = await container.items.query<{words: string[]}>(`SELECT c.words FROM c WHERE c.id IN ('${ids.join('\',\'')}')`).fetchAll();
            const words = repsonse.resources.flatMap(x => x.words);
            results.push(...words)
        }
        
        context.res.headers["Cache-Control"] = "public, max-age=31536000, immutable, no-custom"
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: results,
            headers: {
                ...context.res.headers,
                "Cache-Control": "public, max-age=31536000, immutable, no-custom"
            }
        };
        context.done()
        return;
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an id on the query string"
        };
        context.done()
    }
};



export default httpTrigger;

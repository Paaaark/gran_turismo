import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import awsExports from './aws-exports';
import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers';

export async function getClient() {
    const client = new DynamoDBClient({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
            clientConfig: {region: awsExports.REGION},
            identityPoolId: awsExports.GUEST_IDENTITY_ID,
        })
    });
    return client;
}

export async function fetchData(client, limit) {
    const input = {
        TableName: "gt_car_list",
        Limit: Number(limit),
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    const items = response["Items"];
    const result = [];
    for (let i = 0; i < limit; i++) {
        let item = items[i.toString()];
        let newItem = {};
        Object.keys(item).forEach((key) => (
            newItem[key] = item[key]['S']
        ));
        newItem['img_path'] = newItem['img_path'].substring(0, 11) + 
                              newItem['img_path'].substring(16);
        result.push(newItem);
    }
    return result;
}

export async function fetchFilter(client) {
    const input = {
        TableName: "gt_car_filters",
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    const items = response["Items"];
    const result = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i.toString()];
        let newItem = {
            property: item['property']['S'],
            // #TODO: Figure out what is wrong
            count: item['count']['M']['M']['M']
        };
        result.push(newItem);
    }
    return result;
}
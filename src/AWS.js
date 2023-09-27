import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import awsExports from './aws-exports';
import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

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

export async function fetchImages() {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
            clientConfig: {region: awsExports.REGION},
            identityPoolId: awsExports.GUEST_IDENTITY_ID,
        })
    });
    const input = {Bucket: "gt-project"};
    const listCommand = new ListObjectsCommand(input);
    const listResponse = await client.send(listCommand);
    const fileNames = listResponse.Contents;
    console.log("fileNames: ", fileNames);

    const imgUrls = {};
    for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i]['Key'];
        const getCommand = new GetObjectCommand({
            Bucket: awsExports.S3_BUCKET_NAME,
            Key: fileName
        });
        const url = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
        imgUrls[fileName] = url;
    }

    return imgUrls;
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
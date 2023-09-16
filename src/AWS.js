import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export function getClient() {
    // #TODO: Update the credentials to SSO
    const client = new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: "ASIAZBMDPLH2FKPAVAV7",
            secretAccessKey: "1r5FMM2h0PqtKwvt9L9YLzztDqEERLi0pPJCM3be",
            sessionToken: "IQoJb3JpZ2luX2VjEI3//////////wEaCXVzLWVhc3QtMSJGMEQCIDUBGm5qOuTogpo3qgLNqGPATDCoIxntjJ3O6BPPbZ2JAiBlWurHZBUKZ2/G5XKAj8yuzSlQ1DqmR2MWOkmGLNyn9CrrAgh2EAAaDDYyMTQzNTM3ODE2NCIM8qW4Y4ZKGoMJ8HwCKsgCZAEPWaJm/JGczi2eHxJ7EcDZYXSMErAD+ZISpCwRrfIo0WpcnuZjVEGiCnYfxclrBSPib73CNT1lCPcwVLCYKXh1qf+XS25fg2/dDOKX85SFm1XO96RAknKYms7ZODjsfMWCwrD2wPnsIcsX2htSrDxXJHKugDDWkbxFd2y3joxHJBxKIvotcuZ5eGH1UuCnklN5bAwbFOFPDLWV9Clne+G2xPko0qfzjWhIuFSwfa6kza/ejoRgoorTWlB3R+evZtciRnbClX0jUQosU98qFjF69rSE3F9AIIbYUd/7WuwKE0t9ItlRMFhhNSao5NGxaVa4vMMvTWIoHu18PaC6ZZLo6Y7y+Ypqxxvn1oYm4c4BRsIvDx3zA0f6d4lhftseYW4XhI9FtI79ZyRxppuvTnAyWTAz2SF7UupPa0Rmo5iKLdi2KjdYUTDEzpaoBjqoATpNtOECEk+OLYCxRIJyzH9nR7nn8Rf7y/gFE+Sw7qKEKapsAP4ILp2dwDLo9Kr06SEnDbxrR4BfAHi0JeddNrRhtpPC6Zfk/OZvi/YnugS30PdXZuON9Ekb8pDt5kkwsP2J7iiHqRjbMZLWU61hTuHlZBXjHlEl9ywhDZDM2hNMxDz9SU2kJzaEkvr7/KBo8y7J7zKscatIULRqXZoujAUMDXP7knI/Bg=="
        }
});
    return client;
}

export async function fetchData(client, limit, setData) {
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
        console.log("img_path: ", newItem['img_path']);
        result.push(newItem);
    }
    return result;
}
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export function getClient() {
    // #TODO: Update the credentials to SSO
    const client = new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: "ASIAZBMDPLH2OLZ3XQK5",
            secretAccessKey: "hPXwMKwWadaicBuFmgIU77AWOtQo/i9XP01hHXTO",
            sessionToken: "IQoJb3JpZ2luX2VjENb//////////wEaCXVzLWVhc3QtMSJGMEQCIE42sxRug42Ysi+Sy0/1hMsARDtsxSTQ9LbjQYpLDW2UAiAeN1ryCFBS/9hWLVE1uRHjFkD3ERP3gV6IvZoyN3nOvir1Agi+//////////8BEAAaDDYyMTQzNTM3ODE2NCIMVG1S309WB6msJL69KskC5pt6q18M9wviXyUs8ejVL7p3s6+kckt4W2Wb89FYGlfml35POJGG0wcNigqxzpxg31TD1P7on3Trh9F6m6AFBDsANWHlimVO3zmyz4C2Fw/R8JfDc9Uqz/fv6gj2s0pHJHN9JhDT2afSHMLMNGTrYEMobqN9N0OuPVCWW1BO2Zht9dhoNzlkDS3D5g25n4DLMaui8Hsvbv57VrBrX8mdmOB77JSB6xCxAA1WMN5iY50f/s2njLKP88HDyoxMyypd6s5l5acGQK0SuD4FeHnwUhrV145YTsY0A1ymG+6hYd0DeNAv0yKpzw9KH6B2nXoCaLZF5wnlTMbMvAaZs2Ej3Ss5iGsSd8ou2ym23P3g7bMCcZ70GQAnY9mou6Y4sXhKRSyd0BT7MzMRx1NEba2b/XyqexY1c39yYPZiDHAydRlGmf/EJCEAVwkwyrmmqAY6qAGkslv11eJ1Y7S5JxPuxYmontE3jbVv/FzRuc+5wrcoGL09PgNvqs1eSB5k0OtYD1bd6/aqj3uFCzq8gbD0f8+91PiJ7NdXN5Oys8lJXuLIeAql6iKE3yWpiUvHfj2l6kGi35JuiNDJ8Bi8/7AXuZAtOFpOX3zFixBxk3a1eqjrv9tvmZcmfNcTuZzqUqZ2GFc4i3sEp4U0NXf2/dDiD/vrRwTxT8h/4S8="
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
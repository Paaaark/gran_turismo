import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export function getClient() {
    // #TODO: Update the credentials to SSO
    const client = new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: "ASIAZBMDPLH2PBGMK2O2",
            secretAccessKey: "oIvt2PtWbnQE4qDN2xfmJILTlDti9KW7Ey1ndMxs",
            sessionToken: "IQoJb3JpZ2luX2VjEIf//////////wEaCXVzLWVhc3QtMSJGMEQCIGVOihj5LZBeStscxu4/yIzcS+g2OnuZS7OFPLQt2YvhAiAtLUNsMOnGEEn82sHN/8Xeyt4My3nQzhB+Y6ZUJCupOyrrAghwEAAaDDYyMTQzNTM3ODE2NCIMXCSrTDX+NY0FBTw0KsgC0dPE/rwkYXs14PshDuibXdQ61V0AE71sgmQISONwWK/+szvXXeBE3Zvh1sSVq5DIyyiSrDkgC7am0E5UXGNXBD2C9ddbBCW7RiOnO2Z0fGig7AVdgkTAW7Bf5952CeDpmYKP+/VdTUgI6c/a7ZMFkZ11Ye/phAQHyYZiRfK0Jm1SKydwJQ0KSbo5z3zsGRW/jF+Fx2rb/IyX+ZV6S4AuARo2An8ealp4k6TFynmamppyWxUXNjgjmn08cK8V4+IWYDmBsDcqWyqc6q58VB9qo1m9KrgTydwNR8KjhQJ/rfn6zmN22kpKwParWg85utQlKkjEHCbEfOVxpRe17dtWLVxEpp7lV0Fmwvedf1rZ/yzuE+UcVRFd+u8ncDVU//OdABh8d6RJZKZVcJw1YHvshXHPW2KZeX6enQ+RJpzI4W82frr6vLem+zDRlpWoBjqoAZ/mtX8BVUk1hs/CYmjkEiY3d6crv9d3YGfn5xiFHq1i7FcgO3CpJXqHTqDvzMKgmxN2jZr0RHoPVdlzAsjt4wX8bWBK4N4tvu3MEwwFF29ctfSeSMTJOYn+2Z7geAt+m4GnV0r+QSONX/RfSz4EocrDlAU8ryuuMDlRy+DQ8b/Jxf8bngqespd4omSsHMlaX2vBJiaknu8my3IO4T3RGyZJpOpoSMfPpw=="
        }
});
    return client;
}

export async function fetchData(client, limit) {
    console.log("Trying to fetch data");
    const input = {
        TableName: "gt_car_list",
        Limit: Number(limit),
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}
// const client = new DynamoDBClient

// const [data, setData] = useState(null);

// const client = new DynamoDB({
//     });

// var params = {
// Key: {
//     name: "Alfa Romeo 4C '14"
// },
// TableName: "gt_car_list"
// };
// client.getItem(params, function(err, data) {
// if (err) console.log(err, err.stack);
// else console.log(data)
// });
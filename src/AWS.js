import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export function getClient() {
    // #TODO: Update the credentials to SSO
    const client = new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: "ASIAZBMDPLH2MBAPN2YL",
            secretAccessKey: "lbt/i5Xar89SXnG7MfgoB1wvRegMxWefZisIZU29",
            sessionToken: "IQoJb3JpZ2luX2VjEIv//////////wEaCXVzLWVhc3QtMSJHMEUCIGhun1CdsutcmaQ89Zb4vLxEHNaDZOA/dFZva0UKXQItAiEA+r0t+K9C79y4weloyec6Ko0p6Rd31qpyPSi+0UClkOcq6wIIdBAAGgw2MjE0MzUzNzgxNjQiDNEH+tYHWbiiEvRH7SrIAuRz/nHfuHhOp3RnApOVM0Otkmk1qRRJtRnVTTiTKFFbQ/HORp/alPuaEfxfz3hmVEVzfM2ITXmNZ45jh2WRq3mfXuxnmCSmGnh0MVVMcif9C4ZiH02K+qm3xTQEv/xFALhLIZzPrdTMpig4daA1N7GY+h7F8xQvnUa96po0V+ytzTgJseRxOyjwGaNrhZjP+BQX0CNpXVsR7UZUe1L3rbUo61pL4qjYeCA2SxhvFFibjAAFXlfYoKI++5aZXANlS6mhobdTrjMdJ0TrgA33u3f2ZHc4pNX1DvBqlbtHZONzZ/KnLirX42yKAVt1oFGDLuAhezRMxyqk3qK70khgWaDrLHh3wxDNnAQwMtQ7KpXM+mXjEjUM/FEeR0GhaKFsPqPLKkZKFzihfAkOUz742pgxPthflZ8dF7mbfVUvJ0jEgrhUlsPWmAUwxYeWqAY6pwEbyocno8xSqC0HbINsI8LaxSVFgmJTVYE0y7yQ+W/Ky9op5NqnlWFiwZaOzl7bXBE1+H91Jd7yVfw9ZSiZWhQepKQ8TcVNPpbyiRwQnAI3I2W6RnExvM2fUTmthoFd8k0653U39P4Z0/Do1pqrSIKqNxHOgvJGuHVXHqHNuJfIwj5c+/C3AjRX7aZ1cA4K75U3GzRvvp0zoAzPG7hmpj4vxn9H3/E//A=="
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
        result.push(items[i.toString()]);
    }
    return result;
}
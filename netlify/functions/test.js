import dataSource from "../../plugin/data-source"

export const handler = async (event, context) => {
    await dataSource.connect()
    return {
        statusCode: 200,
        body: JSON.stringify({
            text: `Hello`
        })
    };
}
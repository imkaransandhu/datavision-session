const { BlobServiceClient } = require("@azure/storage-blob");
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function updateBlobGuid(req, res) {
  const { guid } = req.body;
  const accountName = process.env.ACCOUNT_NAME;
  const accountKey = process.env.AZURE_BLOB_KEY;
  const containerName = process.env.CONTAINER_GUID;
  const blobName = "guid.json";

  const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const jsonContent = `{"guid": "${guid}"}`; // Replace with your desired JSON content

  try {
    await blockBlobClient.upload(jsonContent, jsonContent.length, {
      blobHTTPHeaders: { blobContentType: "application/json" },
    });
    console.log(`Successfully updated ${blobName}`);
    res.send(guid);
  } catch (error) {
    console.error(`Error updating ${blobName}: ${error}`);
  }
}

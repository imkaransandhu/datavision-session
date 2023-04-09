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
  const accountName = "guiddatavision";
  const accountKey =
    "YrmqEDdjAuaxRjCxP4RrJfr81NfcT8chie+3Vt7l4rXMzeiCC1lq5Ax8IpkYNSchnZd+/btwoXBf+AStdjMThA==";
  const containerName = "var-guid";
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

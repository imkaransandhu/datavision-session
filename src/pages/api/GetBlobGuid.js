const { BlobServiceClient } = require("@azure/storage-blob");
export default async function getBlobGuid(request, res) {
  const accountName = process.env.ACCOUNT_NAME;
  const accountKey = process.env.AZURE_BLOB_KEY;
  const containerName = process.env.BLOB_GUID;
  const blobName = "guid.json";
  const connStr = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;
  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const downloadResponse = await blockBlobClient.download(0);
  const downloadedContent = await streamToString(
    downloadResponse.readableStreamBody
  );
  const guidJson = JSON.parse(downloadedContent);

  const guid = guidJson.guid;
  res.json(guid);
}

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

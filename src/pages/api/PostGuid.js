import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Get the new GUID from the request body
  if (req.method === "POST") {
    const { guid } = req.body;
    console.log(typeof guid);
    // Update the Guid.json file with the new GUID
    const filePath = path.join(process.cwd(), "Guid.json");
    const fileData = { guid };
    fs.writeFileSync(filePath, JSON.stringify(fileData));

    // Return a success response
    res.status(200).json({ guid });
  }
}

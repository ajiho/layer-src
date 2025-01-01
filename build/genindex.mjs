import fs from "fs-extra";
import utils from "./utils.mjs";

// Directories to scan
const directories = ["demos", "designs", "examples"];

function generateListItems(directory) {
  if (!fs.existsSync(directory)) return "";

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".html"));
  return files
    .map((file) => `<li><a href="${directory}/${file}">${file}</a></li>`)
    .join("\n");
}

function generateHTML() {
  const listItems = directories
    .map(
      (dir) =>
        `<li><a href="#">${dir}</a><ul>${generateListItems(dir)}</ul></li>`
    )
    .join("\n");

  return listItems;
}

const htmlContent = generateHTML();

let indexHtml = fs.readFileSync("build/index.stub.html", "utf-8");

indexHtml = utils.sprintf(indexHtml, htmlContent);

fs.writeFileSync("index.html", indexHtml);

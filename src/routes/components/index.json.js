import components from "./_components.js";

const contents = JSON.stringify(components.map((component) => component));

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}

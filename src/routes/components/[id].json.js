import components from "./_components.js";

const lookup = new Map();
components.forEach((component) => {
  lookup.set(component.id, JSON.stringify(component));
});

export function get(req, res, next) {
  // the `id` parameter is available because
  // this file is called [id].json.js
  const { id } = req.params;

  if (lookup.has(id)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(lookup.get(id));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}

// Vercel serverless function: stores app state in Upstash Redis (chunked, <1MB per request).
const U = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const T = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const KEY = process.env.APP_PASSWORD || "";            // optional: set in Vercel to protect the app

const redis = async (cmd) => {
  const r = await fetch(U, { method: "POST", headers: { Authorization: "Bearer " + T }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
};

module.exports = async (req, res) => {
  try {
    if (!U || !T) return res.status(500).json({ error: "Upstash env vars missing" });
    if (KEY && req.headers["x-app-key"] !== KEY) return res.status(401).json({ error: "unauthorized" });
    const i = parseInt(req.query.i || "0", 10);
    if (req.method === "GET") {
      const n = parseInt((await redis(["GET", "vc:n"])) || "0", 10);
      const chunk = n ? await redis(["GET", "vc:chunk:" + i]) : "";
      return res.status(200).json({ n, chunk: chunk || "" });
    }
    if (req.method === "POST") {
      const n = parseInt(req.query.n || "1", 10);
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      await redis(["SET", "vc:chunk:" + i, body]);
      if (i === n - 1) await redis(["SET", "vc:n", String(n)]);   // commit only after the last chunk
      return res.status(200).json({ ok: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
};

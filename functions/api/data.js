export async function onRequest({ request, env }) {
  const kv = env.MY_KV;
  if (!kv) return new Response(JSON.stringify({}), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  if (request.method === "GET") {
    const data = await kv.get("shop_data", { type: "json" });
    return new Response(JSON.stringify(data || {}), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
  if (request.method === "POST") {
    const body = await request.text();
    await kv.put("shop_data", body);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export default function handleWebUrlEnv(req, res) {
  const env = process.env.ALBY_KEY;
  res.send(env);
}

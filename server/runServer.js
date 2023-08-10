export default  function runServer(APP, PORT, MODE) {
  const server = APP.listen(PORT, () => {
    console.log('Booting Server ...');
    console.log(`Running ${MODE} Mode | URL: http://localhost:${PORT}`);
  });
  return server;
}

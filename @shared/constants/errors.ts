export class NoExtensionInstalledError extends Error {
  message = "PayPi does not appear to be installed.";
}

export class SorobanRpcNotSupportedError extends Error {
  message = "No Soroban RPC available";
}

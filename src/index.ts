export { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
export { DirectSecp256k1HdWallet, decodeTxRaw } from "@cosmjs/proto-signing";
export { GasPrice } from "@cosmjs/stargate";
export { HttpBatchClient, Tendermint34Client, TxData } from "@cosmjs/tendermint-rpc";
export {fromBech32, toBech32} from "@cosmjs/encoding";
export { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { setupWasmExtension, WasmExtension } from "@cosmjs/cosmwasm-stargate";
import { QueryClient } from "@cosmjs/stargate";
import { HttpBatchClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {fromBech32, toBech32} from "@cosmjs/encoding";

export async function createBatchQueryClient(rpcEndpoint: string): Promise<QueryClient & WasmExtension> {
  const httpBatch = new HttpBatchClient(rpcEndpoint);
  const tmClient = await Tendermint34Client.create(httpBatch);
  const queryClient = QueryClient.withExtensions(tmClient, setupWasmExtension);

  return queryClient;
}

export function convertAddress(address: string, prefix: string): string {
  const decoded = fromBech32(address);
  const newAddress = toBech32(prefix, decoded.data);
  return newAddress;
}

/*
export {
  AccountData,
  Algo,
  AminoMsg,
  AminoSignResponse,
  Coin,
  coin,
  coins,
  decodeAminoPubkey,
  decodeBech32Pubkey,
  decodeSignature,
  encodeAminoPubkey,
  encodeBech32Pubkey,
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
  isSecp256k1Pubkey,
  isSinglePubkey,
  isStdTx,
  makeCosmoshubPath,
  makeSignDoc,
  makeStdTx,
  OfflineAminoSigner,
  parseCoins,
  Pubkey,
  pubkeyToAddress,
  pubkeyToRawAddress,
  pubkeyType,
  rawSecp256k1PubkeyToRawAddress,
  Secp256k1HdWallet,
  Secp256k1HdWalletOptions,
  Secp256k1Pubkey,
  Secp256k1Wallet,
  serializeSignDoc,
  SinglePubkey,
  StdFee,
  StdSignature,
  StdSignDoc,
  StdTx,
} from "@cosmjs/amino";
export {
  ChangeAdminResult,
  CodeDetails,
  Contract,
  ContractCodeHistoryEntry,
  CosmWasmClient,
  ExecuteResult,
  fromBinary,
  InstantiateOptions,
  InstantiateResult,
  MigrateResult,
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
  toBinary,
  UploadResult,
  WasmExtension,
} from "@cosmjs/cosmwasm-stargate";

// @cosmjs/crypto
export { Bip39, HdPath, pathToString, Random } from "@cosmjs/crypto";
export {
  fromAscii,
  fromBase64,
  fromBech32,
  fromHex,
  fromRfc3339,
  fromUtf8,
  normalizeBech32,
  toAscii,
  toBase64,
  toBech32,
  toHex,
  toRfc3339,
  toUtf8,
} from "@cosmjs/encoding";

// @cosmjs/faucet-client
export { FaucetClient } from "@cosmjs/faucet-client";

// @cosmjs/ledger-amino
export { LedgerSigner } from "@cosmjs/ledger-amino";

// @cosmjs/math
export { Decimal } from "@cosmjs/math";

// @cosmjs/proto-signing
export { DirectSecp256k1HdWallet, OfflineDirectSigner, OfflineSigner, Registry } from "@cosmjs/proto-signing";

// @cosmjs/stargate
export {
  AuthExtension,
  BankExtension,
  Block,
  calculateFee,
  createPagination,
  DistributionExtension,
  GasPrice,
  GovExtension,
  IbcExtension,
  IndexedTx,
  MintExtension,
  MsgSendEncodeObject,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupIbcExtension,
  setupMintExtension,
  setupStakingExtension,
  setupTxExtension,
  StakingExtension,
  TxExtension,
} from "@cosmjs/stargate";

export { isNonNullObject } from "@cosmjs/utils";
*/

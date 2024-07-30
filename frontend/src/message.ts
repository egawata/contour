// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.0
//   protoc               v5.27.1
// source: backend/message.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "message";

export interface GetContourRequest {
  t1: number;
  t2: number;
  filename: string;
  inImage: Uint8Array;
}

export interface GetContourResponse {
  success: boolean;
  outImage: Uint8Array;
}

function createBaseGetContourRequest(): GetContourRequest {
  return { t1: 0, t2: 0, filename: "", inImage: new Uint8Array(0) };
}

export const GetContourRequest = {
  encode(message: GetContourRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.t1 !== 0) {
      writer.uint32(8).int32(message.t1);
    }
    if (message.t2 !== 0) {
      writer.uint32(16).int32(message.t2);
    }
    if (message.filename !== "") {
      writer.uint32(26).string(message.filename);
    }
    if (message.inImage.length !== 0) {
      writer.uint32(34).bytes(message.inImage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetContourRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetContourRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.t1 = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.t2 = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filename = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.inImage = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetContourRequest {
    return {
      t1: isSet(object.t1) ? globalThis.Number(object.t1) : 0,
      t2: isSet(object.t2) ? globalThis.Number(object.t2) : 0,
      filename: isSet(object.filename) ? globalThis.String(object.filename) : "",
      inImage: isSet(object.inImage) ? bytesFromBase64(object.inImage) : new Uint8Array(0),
    };
  },

  toJSON(message: GetContourRequest): unknown {
    const obj: any = {};
    if (message.t1 !== 0) {
      obj.t1 = Math.round(message.t1);
    }
    if (message.t2 !== 0) {
      obj.t2 = Math.round(message.t2);
    }
    if (message.filename !== "") {
      obj.filename = message.filename;
    }
    if (message.inImage.length !== 0) {
      obj.inImage = base64FromBytes(message.inImage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetContourRequest>, I>>(base?: I): GetContourRequest {
    return GetContourRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetContourRequest>, I>>(object: I): GetContourRequest {
    const message = createBaseGetContourRequest();
    message.t1 = object.t1 ?? 0;
    message.t2 = object.t2 ?? 0;
    message.filename = object.filename ?? "";
    message.inImage = object.inImage ?? new Uint8Array(0);
    return message;
  },
};

function createBaseGetContourResponse(): GetContourResponse {
  return { success: false, outImage: new Uint8Array(0) };
}

export const GetContourResponse = {
  encode(message: GetContourResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.outImage.length !== 0) {
      writer.uint32(18).bytes(message.outImage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetContourResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetContourResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outImage = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetContourResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      outImage: isSet(object.outImage) ? bytesFromBase64(object.outImage) : new Uint8Array(0),
    };
  },

  toJSON(message: GetContourResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.outImage.length !== 0) {
      obj.outImage = base64FromBytes(message.outImage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetContourResponse>, I>>(base?: I): GetContourResponse {
    return GetContourResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetContourResponse>, I>>(object: I): GetContourResponse {
    const message = createBaseGetContourResponse();
    message.success = object.success ?? false;
    message.outImage = object.outImage ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

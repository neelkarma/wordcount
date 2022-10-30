import * as wasm from './wordcount_core_bg.wasm';

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} text
* @returns {number}
*/
export function word_count(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.word_count(ptr0, len0);
    return ret >>> 0;
}

/**
* @param {string} text
* @returns {number}
*/
export function char_count(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.char_count(ptr0, len0);
    return ret >>> 0;
}

/**
* @param {string} text
* @returns {number}
*/
export function unique_word_count(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.unique_word_count(ptr0, len0);
    return ret >>> 0;
}

/**
* @param {string} text
* @returns {number}
*/
export function paragraph_count(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.paragraph_count(ptr0, len0);
    return ret >>> 0;
}

/**
* @param {string} text
* @returns {number}
*/
export function reading_time(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.reading_time(ptr0, len0);
    return ret;
}

/**
* @param {string} text
* @returns {number}
*/
export function speaking_time(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.speaking_time(ptr0, len0);
    return ret;
}


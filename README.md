# wordcount

> Really minimalistic word counter.

![WordCount Screen Recording](./assets/screencap.gif)

## FAQ

### How do you get the reading and speaking times?

The reading time is based off an average reading speed of 275wpm and the
speaking time is based off an average speaking speed of 180wpm.

### Are spaces included in the character count?

Yes.

## Development

Requirements:

- Git
- NodeJS
- `pnpm`
- Rust Toolchain + Cargo
- `wasm-pack`

To Develop:

1. `git clone https://github.com/neelkarma/wordcount.git`
2. `pnpm i`
3. `pnpm build-core`
4. `pnpm dev`

To Build:

1. All the steps but the last in To Develop
2. `pnpm build`

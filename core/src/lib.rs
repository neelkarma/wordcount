use std::collections::HashSet;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn word_count(text: &str) -> usize {
    text.split_ascii_whitespace().count()
}

#[wasm_bindgen]
pub fn char_count(text: &str) -> usize {
    text.chars().filter(|char| char != &'\n').count()
}

#[wasm_bindgen]
pub fn unique_word_count(text: &str) -> usize {
    HashSet::<_>::from_iter(
        text.to_ascii_lowercase()
            .split_ascii_whitespace()
            .map(|word| word.trim_matches(|c: _| (c as char).is_ascii_punctuation())),
    )
    .len()
}

#[wasm_bindgen]
pub fn paragraph_count(text: &str) -> usize {
    text.split('\n').filter(|para| !para.is_empty()).count()
}

#[wasm_bindgen]
pub fn reading_time(text: &str) -> f64 {
    word_count(text) as f64 / 275.
}

#[wasm_bindgen]
pub fn speaking_time(text: &str) -> f64 {
    word_count(text) as f64 / 180.
}

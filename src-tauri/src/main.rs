// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


//dependencias de la funcion select_folder xd

use std::path::PathBuf;
//use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[tauri::command]
fn select_folder() -> Result<Option<String>, String> {
    let result: Option<PathBuf> = rfd::FileDialog::new()
        .set_directory("~/")
        .pick_folder();
    match result {
        Some(folder_path) => Ok(Some(folder_path.to_string_lossy().to_string())),
        None => Ok(None),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![select_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

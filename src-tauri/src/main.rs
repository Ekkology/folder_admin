// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


//dependencias de la funcion select_folder xd

use std:: path::PathBuf;
//use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[tauri::command]
fn select_folder() -> Result<Option<String>, String> {
    let  result: Option<PathBuf> = rfd::FileDialog::new()
        .set_directory("~/")
        .pick_folder();
    match result {
        Some(folder_path) => Ok(Some(folder_path.to_string_lossy().to_string())),
        None => Ok(None),
        
    }
}
#[tauri::command]
fn escritura_ruta(nombre_ruta:String) {
    println!("La ruta seleccionada es : {}",nombre_ruta);
}

use  std::{io,fs};

#[tauri::command]
fn creacion_de_carpetas(nombre_ruta:String){
    //se declara la variable para pedir los datos
     let mut numeros_de_carpetas=String::new() ; 
     let error_lec = "Ha ocurrido algo al leer el valor";
     io::stdin().read_line(&mut numeros_de_carpetas).expect_err(error_lec);
     fs::create_dir(nombre_ruta+"/Prueba").expect_err(error_lec);
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![select_folder,escritura_ruta, creacion_de_carpetas])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

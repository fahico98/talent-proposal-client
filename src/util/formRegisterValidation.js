
import axios from "axios";
import { differenceInDays, isAfter } from "date-fns";

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const alphaRegex = /^[ñÑ.a-zA-Záéíóú]*$/;

export const alphaNumRegex = /^[ñÑa-zA-Z0-9áéíóú]*$/;

export const spanishRegex = /[ñÑáéíóú]/;

export function afterToday(value){
   return (isAfter(new Date(), new Date(value))) ? null : "Su fecha de nacimiento debe ser anterior a la fecha actual.";
}
   
export function rightAge(value){
   return (differenceInDays(new Date(), new Date(value)) >= 6575) ? null : "Debes tener por los menos 18 años de edad para registrarte.";
}
   
export function alpha(value){
   return (alphaRegex.test(String(value).trim())) ? null : "Este campo solo admite caracteres alfabéticos.";
}
   
export function alphaNum(value){
   return (alphaNumRegex.test(String(value).trim())) ? null : "Este campo solo admite caracteres alfanuméricos.";
}
   
export function required(value){
   return (String(value).trim() === "") ? "Este campo es obligatorio." : null;
}
   
export function spanish(value){
   return (spanishRegex.test(String(value).trim())) ? "Este campo no debe contener ñ ni tildes." : null;
}
   
export function email(value){
   return (emailRegex.test(String(value).trim())) ? null : "El texto ingresado no corresponde con un correo electrónico.";
}

export function maxLength(value, n){
   return (String(value).trim().length > n) ? "Este campo no debe contener mas de " + String(n) + " caracteres." : null;
}

export function minLength(value, n){
   return (String(value).trim().length < n) ? "Este campo no debe contener menos de " + String(n) + " caracteres." : null;
}
   
export async function uniqueEmail(value){
   let response = await axios.get("user/email_exists/" + value);
   return (response.data) ? "Este dirección de correo electrónico pertenece a alguien mas." : null;
}
   
export async function uniqueUsername(value){
   let response = await axios.get("user/username_exists/" + value);
   return (response.data) ? "Este nombre de usuario pertenece a alguien mas." : null;
}

import axios from 'axios';
import { defineNuxtPlugin } from '#app';

const api = axios.create({
  baseURL: 'https://official-joke-api.appspot.com/',
  // baseURL: 'http://localhost:3005/',
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('api', api);
});

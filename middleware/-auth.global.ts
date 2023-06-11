import PocketBase from 'pocketbase';
const pb = new PocketBase('http://dimplegoertz.de');
import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to) => {
    // const cookie = useCookie("pocketbase_auth");

    const localStore = await useStorage('pocketbase_auth', localStorage)
    console.log('localStore',localStore);

    // if(cookie){

      // const authData = await pb.collection('users').authRefresh();
      
      // // after the above you can also access the refreshed auth data from the authStore
      // console.log(pb.authStore.isValid);
      // console.log(pb.authStore.token);
      // console.log(pb.authStore.model.id);
    // }

});

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2ODA0NjA3MzUsImlkIjoibDhkdHlvZnIwdzl6ZXoxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.wlHg-UYOR0yfhWlbDJ7WdNDhLgiIrzFKFOxAMh4NT20","model":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-03-19 12:45:27.524Z","email":"alexbueckner@gmail.com","emailVisibility":false,"id":"l8dtyofr0w9zez1","name":"Alex","updated":"2023-03-19 12:45:33.083Z","username":"alex","verified":true,"expand":{}}}

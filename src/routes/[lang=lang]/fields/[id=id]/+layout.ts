import type { Load } from "@sveltejs/kit"
import { error } from '@sveltejs/kit'
import type { FieldDto } from "$lib/types";
import axios from '$lib/axios';
import Axios from 'axios';

export const load: Load = async ({ params }) => {
  let field: FieldDto;

  try {
    field = (await axios.get(`/field/${params.id}`)).data.data;

  } catch (err) {
    if (err instanceof Axios.AxiosError) {
      throw error(err.status || 500, {
        message: err.message,
      });
    }
    throw error(500, {
      message: err as string,
    });
  }

  return {
    field,
  }
}
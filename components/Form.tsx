import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

export type Phone = {
    number: string;
    country: string;
    is_valid: boolean;
  };
  
  type Data = {
    phone: Phone;
    added?: boolean;
  };
  
  export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
      const phone = ctx.params;
      console.log(phone);
  
      const API_KEY = Deno.env.get("API_KEY");
      if (!API_KEY) {
        throw new Error("You need a Api Ninja Key");
      }
  
      const urlApi =
        `https://api.api-ninjas.com/v1/validatephone?number=${phone}`;
  
      if (phone) {
        try {
          const response = await axios.get<Data>(urlApi, {
            headers: { "X-Api-Key": API_KEY },
          });
  
          if (response.data.phone.number.length === 0) {
            response.data.added = false;
            throw new Error("Api ninja error");
          }
  
          response.data.added = true;
  
          return ctx.render(response.data);
        } catch (error) {
          console.error(error);
          return new Response("Api ninja error");
        }
      }
  
      return ctx.render();
    },
  };
  


export default function Form (props: PageProps<Data>) {
   
};


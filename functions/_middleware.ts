import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ email: "info@zzzkan.me" }],
    },
  ],
  from: {
    name: "zzzkan.me",
    email: "noreplay@zzzkan.me",
  },
  respondWith: () => {
    return new Response(`Thank you for submitting your enquiry.`);
  },
});

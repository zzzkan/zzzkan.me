import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ email: "zzz602214076@outlook.com" }],
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

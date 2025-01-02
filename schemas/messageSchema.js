import { z } from "zod";

export const messageValidation = z.object({
    username: z
        .string()
        .min(3, "name must be 3 letter minimum")
        .max(15, "Name must no longer than 15 chars"),
    userid: z.string().min(1),
    content: z
        .string()
        .min(2, "Message should me min 2 char long")
        .max(15000, "Msg is too large"),
    sentTo: z.string().min(1),
});

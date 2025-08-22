import { verifyWebhook } from "@clerk/express/webhooks";
import { raw, Router } from "express";
import { createUserInDb, deleteUserFromDb, updateUserInDb } from "../utils/db";

const router = Router();
router.post("/clerk", raw({ type: "application/json" }), async (req, res) => {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;
    switch (eventType) {
      case "user.created":
        const dbResp = await createUserInDb(evt);
        console.log("User created in DB:", dbResp);
        break;
      case "user.deleted":
        const deleteResp = await deleteUserFromDb(evt);
        console.log("User deleted from DB:", deleteResp);
        break;
      case "user.updated":
        const updateResp = await updateUserInDb(evt);
        console.log("User updated in DB:", updateResp);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
    return res.send("Webhook Successfully Processed");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
});
export default router;

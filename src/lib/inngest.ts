import { Inngest } from "inngest";
export const inngest=new Inngest({id:"pixelloom"});
export const autosaveCanvas=inngest.createFunction({id:"canvas-autosave",retries:3},{event:"canvas/autosave.requested"},async({event,step})=>step.run("prepare-checkpoint",async()=>({canvasId:String(event.data.canvasId),requestedAt:new Date().toISOString(),objectCount:Number(event.data.objectCount??0),status:"checkpoint-prepared"})));
export const sendInvite=inngest.createFunction({id:"workspace-invite",retries:2},{event:"workspace/invite.requested"},async({event,step})=>step.run("validate-invite",async()=>({email:String(event.data.email),workspaceId:String(event.data.workspaceId),acceptedForDelivery:Boolean(event.data.email&&event.data.workspaceId)})));
export const functions=[autosaveCanvas,sendInvite];
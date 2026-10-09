import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
export const list=query({args:{ownerId:v.string()},handler:(ctx,args)=>ctx.db.query("canvases").withIndex("by_owner",q=>q.eq("ownerId",args.ownerId)).order("desc").collect()});
export const create=mutation({args:{title:v.string(),ownerId:v.string()},handler:(ctx,args)=>ctx.db.insert("canvases",{...args,updatedAt:Date.now(),isArchived:false})});
export const rename=mutation({args:{id:v.id("canvases"),title:v.string()},handler:(ctx,args)=>ctx.db.patch(args.id,{title:args.title,updatedAt:Date.now()})});
export const archive=mutation({args:{id:v.id("canvases")},handler:(ctx,args)=>ctx.db.patch(args.id,{isArchived:true,updatedAt:Date.now()})});
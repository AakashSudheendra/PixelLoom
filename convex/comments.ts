import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
export const list=query({args:{canvasId:v.id("canvases")},handler:(ctx,args)=>ctx.db.query("comments").withIndex("by_canvas",q=>q.eq("canvasId",args.canvasId)).order("desc").collect()});
export const add=mutation({args:{canvasId:v.id("canvases"),userId:v.string(),body:v.string()},handler:(ctx,args)=>ctx.db.insert("comments",{...args,createdAt:Date.now()})});
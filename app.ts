// app.ts
import { Application,send, Router } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory, renderHandlebars, hbs
} from "https://deno.land/x/view_engine@v1.4.5/mod.ts";


const handlebarsEngine = engineFactory.getHandlebarsEngine();

const oakAdapter = adapterFactory.getOakAdapter();

// hbs.regist
// const ShellBar:string = renderHandlebars("ShellBar",{ data: { dbName: "OWS", userName: "oonu" } });
// const I1:string = renderHandlebars("index",{ data: { dbName: "OWS", userName: "oonu" } });



const app = new Application();
// Handlebars 
app.use(
  viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./views",
    viewExt: ".tmpl.html",
  })
);
// const ShellBar = renderHandlebars("ShellBar", 
// { data: { dbName: "OWS", userName: "oonu" } },
// { viewRoot: "./dist",
//   viewExt: ".html", },"ShellBar")


// static content
app.use(async (context, next) => {
    const root = `${Deno.cwd()}/views`
    try {
        await context.send({ root })
    } catch {
        next()
    }
})

// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  const router = new Router();
router
  .get("/ows/dashboard", (context) => {
    // context.response.headers.set("X-Response-Time", `1ms`);
    // context.response.status = 201;
    // context.response.redirect("info")
    context.render("ShellBar", { data: { PTitle: "OWS", STitle: "oonu" } })
  })
  .get("/ows/index", (context) => {
    context.render("index", { data: { dbName: "OWS", userName: "oonu" } })
  })
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server starte at http://localhost:8000`);

await app.listen({ port: 8000 });
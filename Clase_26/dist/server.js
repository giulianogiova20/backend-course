(()=>{"use strict";var e={514:e=>{e.exports=require("knex")}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=require("express");var t=r.n(e);const o=require("dotenv");var n=r.n(o);const i=require("path");var s=r.n(i);const c=require("socket.io");var d=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};const a=new class{constructor(e,t){this.db=r(514)(e),this.table=t,this.createTableIfNotExists()}createTableIfNotExists(){return d(this,void 0,void 0,(function*(){if(!(yield this.db.schema.hasTable(this.table)))try{yield this.db.schema.createTableIfNotExists(this.table,(e=>{e.increments("id").primary(),e.string("title"),e.integer("price"),e.string("thumbnail"),e.integer("timestamp")}))}catch(e){console.error(e)}}))}addProduct(e){return d(this,void 0,void 0,(function*(){try{const t=Date.now();yield this.db.insert(Object.assign(Object.assign({},e),{timestamp:t})).into(this.table)}catch(e){console.log("Method save: ",e)}}))}getAll(){return d(this,void 0,void 0,(function*(){try{return yield this.db.select("*").from(this.table)}catch(e){console.log("Method getAll: ",e)}}))}getById(e){return d(this,void 0,void 0,(function*(){try{return(yield this.db.select("*").where("id",e).from(this.table))||{error:"Product not found"}}catch(e){console.log("Method getById: ",e)}return{error:"fetch item method failed"}}))}updateProduct(e,t){return d(this,void 0,void 0,(function*(){try{yield this.db.where("id",e).update({title:t.name,price:t.price,thumbnail:t.photoURL}).from(this.table)}catch(e){console.log("Method update: ",e)}}))}deleteProduct(e){return d(this,void 0,void 0,(function*(){try{yield this.db.delete("*").where("id",e).from(this.table)}catch(e){console.log("Method deleteById: ",e)}}))}}({client:"mysql",connection:{host:"127.0.0.1",port:3306,user:"root",password:"",database:"clase_24"},pool:{min:0,max:7}},"products"),u=require("fs");var l=r.n(u);const h=require("normalizr"),f=(e,t)=>{const r=new h.schema.Entity("author",{},{idAttribute:"email"}),o=new h.schema.Entity("message",{author:r},{idAttribute:"id"}),n=new h.schema.Entity("messages",{messages:[o]},{idAttribute:"id"});return"normalize"==e?(0,h.normalize)({id:"messages",messages:t},n):(0,h.denormalize)(t.result,n,t.entities)},v=require("util");var p=r.n(v),m=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};function y(e){console.log(p().inspect(e,!1,12,!0))}const g=new class extends class{constructor(e){this.filePath=e}}{constructor(){super("./DB/chat.json")}readChatFromFile(){return m(this,void 0,void 0,(function*(){try{const e=yield l().promises.readFile(this.filePath,"utf8"),t=JSON.parse(e),r=f("denormalize",t);return console.log("Denormalized"),y(r),r}catch(e){console.log("File cannot be read "+e)}}))}writeChatToFile(e){return m(this,void 0,void 0,(function*(){try{const t=f("normalize",e);console.log("Normalized"),y(t),yield l().promises.writeFile(this.filePath,JSON.stringify(t))}catch(e){console.log("File cannot be written "+e)}}))}},w=require("cookie-parser");var b=r.n(w);const P=require("express-session");var x=r.n(P);const F=require("passport");var j=r.n(F);const N=require("connect-mongo");var C=r.n(N);n().config();const I={mongoDB:{URI:`mongodb+srv://${process.env.MONGOUSR}:${process.env.MONGOPWD}@${process.env.MONGOCLUSTER}.mongodb.net/?retryWrites=true&w=majority`}},O=require("passport-local"),q=require("mongoose");var S=r.n(q);const R=require("bcrypt");var E=r.n(R),B=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};const U=new(S().Schema)({username:{type:String,required:!0,unique:!0},password:{type:String,required:!0},email:{type:String,required:!0,lowercase:!0,trim:!0,unique:!0}},{collection:"users"});U.pre("save",(function(e){return B(this,void 0,void 0,(function*(){const t=this;if(!t.isModified("password"))return e();try{const r=yield E().genSalt(10),o=yield E().hash(t.password,r);t.password=o,e()}catch(t){e(t)}}))})),U.methods.encryptPassword=e=>B(void 0,void 0,void 0,(function*(){const t=yield E().genSalt(10);return E().hash(e,t)})),U.methods.comparePassword=(e,t)=>B(void 0,void 0,void 0,(function*(){return yield E().compareSync(e,t)}));const k=S().model("User",U);var M=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};const z=(0,e.Router)();j().use("login",new O.Strategy({passReqToCallback:!0},((e,t,r,o)=>{return n=void 0,i=void 0,c=function*(){try{const e=yield k.findOne({username:t}).exec();return e?(yield e.comparePassword(r,e.password))?(console.log(e),o(null,e)):o(null,!1,{message:"Wrong password"}):o(null,!1,{message:"User doesn't exist"})}catch(e){o(e)}},new((s=void 0)||(s=Promise))((function(e,t){function r(e){try{d(c.next(e))}catch(e){t(e)}}function o(e){try{d(c.throw(e))}catch(e){t(e)}}function d(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(e){e(n)}))).then(r,o)}d((c=c.apply(n,i||[])).next())}));var n,i,s,c}))),z.get("/",((e,t)=>{e.isAuthenticated()?t.redirect("/"):t.render("login")})),z.post("/",j().authenticate("login",{failureRedirect:"/login/failed",failureFlash:!0}),((e,t,r)=>M(void 0,void 0,void 0,(function*(){t.status(200).render("home",{user:e.user}),r()})))),z.get("/failed",((e,t)=>{t.status(401).render("failedLogin",{message:e.flash("error")[0]})}));const A=z,T=(0,e.Router)();T.post("/",((e,t)=>{e.session.destroy((()=>{t.render("login")}))}));const $=T;const D=(0,e.Router)();j().use("signup",new O.Strategy({passReqToCallback:!0},((e,t,r,o)=>{return n=void 0,i=void 0,c=function*(){const n=new k({username:t,password:r,email:e.body.email});try{return yield n.save(),o(null,n)}catch(e){return 11e3===e.code?o(null,!1,{message:"User already exists"}):(console.log(e),o(e))}},new((s=void 0)||(s=Promise))((function(e,t){function r(e){try{d(c.next(e))}catch(e){t(e)}}function o(e){try{d(c.throw(e))}catch(e){t(e)}}function d(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(e){e(n)}))).then(r,o)}d((c=c.apply(n,i||[])).next())}));var n,i,s,c}))),D.get("/",((e,t)=>M(void 0,void 0,void 0,(function*(){e.isAuthenticated()?t.redirect("/"):t.render("signup")})))),D.post("/",j().authenticate("signup",{failureRedirect:"/signup/failed",failureFlash:!0}),((e,t,r)=>M(void 0,void 0,void 0,(function*(){t.status(201).render("createdUser",{user:e.user}),r()})))),D.get("/failed",((e,t)=>M(void 0,void 0,void 0,(function*(){t.status(409).render("failedSignup",{message:e.flash("error")[0]})}))));const _=D;var J=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};const L=require("@faker-js/faker");const G=(0,e.Router)();G.get("/products",((e,t)=>J(void 0,void 0,void 0,(function*(){const e=yield a.getAll();t.json(e)})))),G.get("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=yield a.getById(Number(r));t.json(o)})))),G.post("/products",((e,t)=>J(void 0,void 0,void 0,(function*(){const r=e.body,o=yield a.addProduct(r);t.json(o)})))),G.put("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=e.body;yield a.updateProduct(Number(r),o),t.json({msg:`producto ${r} actualizado`})})))),G.delete("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=yield a.deleteProduct(Number(r));t.json({deletedProduct:o})})))),G.get("/products-test",((e,t)=>{return r=void 0,o=void 0,i=function*(){try{const e=new class{constructor(){this.memoryProducts=[]}listFakerProducts(e=5){const t=[];for(let r=0;r<e;r++){const e={code:L.faker.random.word(),name:L.faker.commerce.productName(),price:Number(L.faker.commerce.price()),stock:Number(L.faker.random.numeric()),description:L.faker.commerce.productDescription(),photoURL:L.faker.image.imageUrl()};t.push(e)}return t}},r=yield e.listFakerProducts();return console.log("Result",r),t.json(r)}catch(e){console.log(`Han error has ocurred; ${e}`)}},new((n=void 0)||(n=Promise))((function(e,t){function s(e){try{d(i.next(e))}catch(e){t(e)}}function c(e){try{d(i.throw(e))}catch(e){t(e)}}function d(t){var r;t.done?e(t.value):(r=t.value,r instanceof n?r:new n((function(e){e(r)}))).then(s,c)}d((i=i.apply(r,o||[])).next())}));var r,o,n,i}));const W=G;var H=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};class K{constructor(e){this.writeFile=e=>H(this,void 0,void 0,(function*(){try{yield l().promises.writeFile(K.filePath,JSON.stringify(e))}catch(e){console.log("Method: writeFile, ",e)}})),this.readCartFile=()=>H(this,void 0,void 0,(function*(){try{return(yield l().promises.readFile(K.filePath,"utf8"))?JSON.parse(yield l().promises.readFile(K.filePath,"utf8")):[]}catch(e){if(-2===e.errno)try{return yield l().promises.writeFile(K.filePath,JSON.stringify([])),[]}catch(e){console.error("Method: readFile: could not create file in such directory.",e)}else console.log("Method readFile: ",e);return[]}})),this.readProductsFile=()=>H(this,void 0,void 0,(function*(){try{return(yield l().promises.readFile(this.productFilePath,"utf8"))?JSON.parse(yield l().promises.readFile(this.productFilePath,"utf8")):[]}catch(e){if(-2===e.errno)try{return yield l().promises.writeFile(this.productFilePath,JSON.stringify([])),[]}catch(e){console.error("Could not create file in such directory. ",e)}else console.log("Method readFile: ",e);return[]}})),this.createNewCart=()=>H(this,void 0,void 0,(function*(){try{const e=yield this.readCartFile(),t=(new Date).toLocaleString("es-AR");if(0===e.length||void 0===e)return yield this.writeFile([{cartId:1,timestamp:t,products:[]}]),1;{const r=Math.max(...e.map((e=>e.cartId)))+1;return yield this.writeFile([...e,{cartId:r,timestamp:t,products:[]}]),r}}catch(e){return console.error(e),e}})),this.deleteCartById=e=>H(this,void 0,void 0,(function*(){try{const t=yield this.readCartFile();if(0===t.length||void 0===t)return-1;{const r=t.filter((t=>t.cartId!==e));return r.length===t.length?-2:(yield this.writeFile(r),200)}}catch(e){return console.error(e),e}})),this.getProductsByCartId=e=>H(this,void 0,void 0,(function*(){try{const t=(yield this.readCartFile()).find((t=>t.cartId===e));if(void 0!==t){const e=t.products;return 0===e.length?new Error("Cart has no products"):e}return new Error("Cart not found")}catch(e){return console.error(e),e}})),this.addProductsById=(e,t)=>H(this,void 0,void 0,(function*(){try{const r=yield this.readCartFile(),o=r.find((t=>t.cartId===e)),n=yield this.readProductsFile(),i=Number(t.id),s=n.filter((e=>{if(e.id===i)return e}));if(0===s.length)return new Error(`Product with id: ${i} not found`);if(void 0!==o&&void 0!==s){const t=[...o.products,...s],n=r.map((r=>r.cartId===e?Object.assign(Object.assign({},r),{products:t}):r));return yield this.writeFile(n),s}}catch(e){return console.error(e),e}})),this.deleteProductByCartId=(e,t)=>H(this,void 0,void 0,(function*(){try{const r=yield this.readCartFile(),o=r.find((t=>t.cartId===e));if(void 0===o)return new Error(`Cart with id: ${e} not found`);{const n=o.products.filter((e=>e.id!==t));if(n.length===o.products.length)return new Error(`Product with id: ${t} not found in cart id: ${e}`);{const t=r.map((t=>t.cartId===e?Object.assign(Object.assign({},t),{products:n}):t));yield this.writeFile(t)}}}catch(e){return console.error(e),e}})),K.filePath=e,this.productFilePath="./api/data/products.txt"}}const Y=new K("./api/DB/cart.txt");var Q=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};const V=(0,e.Router)();V.post("/cart/",((e,t)=>Q(void 0,void 0,void 0,(function*(){const e=yield Y.createNewCart();if("number"!=typeof e)return t.status(500).json({error:-1,msg:"Error creating cart",cartId:e});t.json(e)})))),V.delete("/cart/:id",((e,t)=>Q(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=yield Y.deleteCartById(Number(r));return o instanceof Error?t.status(500).json({error:-1,msg:o.message}):-1===o?t.status(500).json({error:-1,msg:"Cart file is empty!"}):-2===o?t.status(500).json({error:-2,msg:`There is no cart with id= ${r}`}):void t.json(`Cart id: ${r} deleted.`)})))),V.get("/cart/:id/products",((e,t)=>Q(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=yield Y.getProductsByCartId(Number(r));if(o instanceof Error)return t.status(500).json({error:-1,msg:o.message});t.json(o)})))),V.post("/cart/:id/products",((e,t)=>Q(void 0,void 0,void 0,(function*(){const{id:r}=e.params,o=e.body,n=yield Y.addProductsById(Number(r),o);if(n instanceof Error)return t.status(500).json({error:-1,msg:n.message});t.json(n)})))),V.delete("/cart/:id/products/:id_prod",((e,t)=>Q(void 0,void 0,void 0,(function*(){const{id:r,id_prod:o}=e.params,n=yield Y.deleteProductByCartId(Number(r),Number(o));if(n instanceof Error)return t.status(500).json({error:-1,msg:n.message});t.json(n)}))));const X=V,Z=require("connect-flash");var ee=r.n(Z),te=function(e,t,r,o){return new(r||(r=Promise))((function(n,i){function s(e){try{d(o.next(e))}catch(e){i(e)}}function c(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,c)}d((o=o.apply(e,t||[])).next())}))};n().config();const re=process.env.PORT,oe=t()(),ne=oe.listen(re,(()=>{console.log(`Server listening on port: ${re}`)})),ie=new c.Server(ne);oe.use(t().static(s().join(__dirname,"../public"))),oe.use(t().json()),oe.use(b()()),oe.use(t().urlencoded({extended:!0})),oe.set("views",s().join(__dirname,"../api/views")),oe.set("view engine","ejs");const se={useNewUrlParser:!0,useUnifiedTopology:!0};oe.use(x()({store:C().create({mongoUrl:I.mongoDB.URI,mongoOptions:se}),secret:process.env.SECRET_KEY,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{maxAge:6e5}})),S().connect(I.mongoDB.URI,se,(e=>{try{console.log("Connected to MongoDB Atlas")}catch(e){throw e}})),oe.use(j().initialize()),oe.use(j().session()),oe.use(ee()()),j().serializeUser(((e,t)=>{t(null,e._id)})),j().deserializeUser(((e,t)=>te(void 0,void 0,void 0,(function*(){const r=yield k.findById(e);t(null,r)})))),oe.use("/login",A),oe.use("/logout",$),oe.use("/signup",_),oe.use("/api",W,X),oe.get("/",((e,t,r)=>e.isAuthenticated()?r():t.render("unauthorized")),((e,t)=>te(void 0,void 0,void 0,(function*(){t.render("home",{logged:!0,user:e.user})}))));let ce=[];ie.on("connection",(e=>te(void 0,void 0,void 0,(function*(){e.emit("server:products",yield a.getAll()),e.emit("server:message",ce),e.on("client:product",(e=>te(void 0,void 0,void 0,(function*(){a.addProduct(e),ie.emit("server:products",yield a.getAll())})))),e.on("client:message",(e=>te(void 0,void 0,void 0,(function*(){e.id=ce.length+1,ce.push(e),g.writeChatToFile(ce);const t=ce,r=f("normalize",ce),o=JSON.stringify(r).length,n=JSON.stringify(t).length;let i=Math.round(100*o/n);console.log(`Compression Rate: ${(100-i).toFixed(2)}%`),ie.emit("server:message",ce)}))))}))))})()})();
import{_ as n,a as e,p as a,e as p,t as o,a3 as t,o as i}from"./chunks/framework.8_iCw7Np.js";const _=JSON.parse('{"title":"Protocol Buffers AS OAS DSL","description":"Use Protocol Buffers as DSL to define OAS(Open API Specification","frontmatter":{"title":"Protocol Buffers AS OAS DSL","description":"Use Protocol Buffers as DSL to define OAS(Open API Specification"},"headers":[],"relativePath":"sdk/proto/proto-oas.md","filePath":"sdk/proto/proto-oas.md","lastUpdated":1714795370000}'),r={name:"sdk/proto/proto-oas.md"},l={id:"frontmatter-title",tabindex:"-1"},c=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),u=t(`<h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><p><a href="https://github.com/OAI/OpenAPI-Specification" target="_blank" rel="noreferrer">The OpenAPI Specification</a> target for:</p><blockquote><p>The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs. This allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.</p></blockquote><p>Similar to what interface descriptions have done for <strong>lower-level programming</strong>, the OpenAPI Specification removes guesswork in calling a service.</p><p>When it comes to interface descriptions for lower-level programming, we use a concept called <strong>IDL</strong> (Interface Definition Language). For example, Protocol Buffers and Apache Thrift fall into the category of IDL.</p><p>To establish a common language for OpenAPI definition, we can combine DSL and IDL, enabling concise syntax and language-agnostic interfaces for interoperability across programming languages and frameworks. This fosters collaboration and seamless API design and consumption.</p><h2 id="apihug" tabindex="-1">ApiHug <a class="header-anchor" href="#apihug" aria-label="Permalink to &quot;ApiHug&quot;">​</a></h2><p>ApiHug has made further advancements in integration and innovation, making the entire process more robust and easily adaptable for engineering purposes. It offers a comprehensive DSL design specifically catering to OpenAPI, a complete toolchain, and seamless integration with modern enterprise development, resulting in efficient and streamlined API development.</p><p><a href="https://github.com/apihug/apihug-proto/" target="_blank" rel="noreferrer">ApiHug Proto for OAS</a> define extension to support OAS standard.</p><p>Example <a href="https://github.com/apihug/apihug-full-demo/blob/main/demo-user-proto/src/main/proto/com/apihug/demo/user/proto/api/admin/api.proto" target="_blank" rel="noreferrer">API Definition</a>:</p><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>service UserAdminService {</span></span>
<span class="line"><span>  option (hope.swagger.svc) = {</span></span>
<span class="line"><span>    path: &quot;/user/admin&quot;;</span></span>
<span class="line"><span>    description: &quot;User admin server&quot;;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rpc SayHello (google.protobuf.Empty) returns (google.protobuf.Empty) {</span></span>
<span class="line"><span>    option (hope.swagger.operation) = {</span></span>
<span class="line"><span>      get: &quot;/say-hello&quot;;</span></span>
<span class="line"><span>      description: &quot;Hello from the user admin server&quot;;</span></span>
<span class="line"><span>      tags: &quot;project&quot;;</span></span>
<span class="line"><span>      priority: MIDDLE;</span></span>
<span class="line"><span>      authorization:{</span></span>
<span class="line"><span>        low_limit_risky_mode: ANONYMOUS</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rpc RegisterCustomer (com.apihug.demo.user.proto.api.admin.request.RegisterRequest) returns (com.apihug.demo.user.proto.api.admin.response.CustomerRegisteredResponse) {</span></span>
<span class="line"><span>    option (hope.swagger.operation) = {</span></span>
<span class="line"><span>      post: &quot;/register&quot;;</span></span>
<span class="line"><span>      description: &quot;admin try to register a new customer&quot;;</span></span>
<span class="line"><span>      priority: CRITICAL;</span></span>
<span class="line"><span>      authorization:{</span></span>
<span class="line"><span>        rbac:{</span></span>
<span class="line"><span>          authorities: [&quot;USER_ADD&quot;];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  rpc ChangePassword (com.apihug.demo.user.proto.api.admin.request.ChangePasswordRequest) returns (com.apihug.demo.user.proto.api.admin.response.CustomerPasswordUpdatedResponse) {</span></span>
<span class="line"><span>    option (hope.swagger.operation) = {</span></span>
<span class="line"><span>      post: &quot;/change-password&quot;;</span></span>
<span class="line"><span>      description: &quot;use to reset the password after password forgot&quot;;</span></span>
<span class="line"><span>      priority: HIGH;</span></span>
<span class="line"><span>      authorization:{</span></span>
<span class="line"><span>        rbac:{</span></span>
<span class="line"><span>          authorities: [&quot;USER_ADD&quot;, &quot;USER_DELETE&quot;];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="refer" tabindex="-1">Refer <a class="header-anchor" href="#refer" aria-label="Permalink to &quot;Refer&quot;">​</a></h2><ol><li><a href="https://github.com/grpc-ecosystem/grpc-gateway" target="_blank" rel="noreferrer">gRPC-Gateway</a> is a plugin of protoc. It reads a gRPC service definition and generates a reverse-proxy server which translates a RESTful JSON API into gRPC.</li><li><a href="https://github.com/googleapis/googleapis/tree/master/google/api" target="_blank" rel="noreferrer">Google Open API Protos</a> public Google APIs that support both REST and gRPC protocols.</li><li><a href="https://github.com/OAI/OpenAPI-Specification" target="_blank" rel="noreferrer">The OpenAPI Specification</a></li><li><a href="https://github.com/apihug/apihug-full-demo" target="_blank" rel="noreferrer">Apihug full demo</a></li></ol>`,13);function d(s,g,h,f,m,b){return i(),e("div",null,[a("h1",l,[p(o(s.$frontmatter.title)+" ",1),c]),u])}const P=n(r,[["render",d]]);export{_ as __pageData,P as default};

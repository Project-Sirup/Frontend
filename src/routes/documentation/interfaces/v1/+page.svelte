<h1 id="interface-v.1">Interface V.1</h1>
<ul>
<li>Register with the RegisterService
<ul>
<li>Send a http <code>post</code> request to the RegisterService
<ul>
<li>Must have a valid token in http requset header</li>
<li>This respondes with a UUID(serviceId) that must be kept</li>
</ul></li>
<li>Register an endpoint that can be called
<ul>
<li>When this endpoint is called, it must return a path to download the generated code</li>
</ul></li>
<li>Provide a <code>manisfest.json</code> over all its implementations details
<ul>
<li>The langauge(s) it can generate</li>
<li>The api types it can generate</li>
<li>The database connections it can generate</li>
</ul></li>
<li>Unregister from the RegisterService when shutting down
<ul>
<li>Send a http <code>delete</code> request to the RegisterService with the serviceId</li>
</ul></li>
</ul></li>
<li>Accept and parse requests</li>
<li>Generate code from the requests</li>
<li>Deliver the code as a <code>zip</code> file</li>
</ul>
<h2 id="manifest.json">manifest.json</h2>
<p>The <code>manifest.json</code> must follow the structure below:</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb1-1"><span class="fu">{"{"}</span></span>
<span id="cb1-2">    <span class="dt">&quot;sirup_v&quot;</span><span class="fu">:</span> <span class="dv">1</span><span class="fu">,</span></span>
<span id="cb1-3">    <span class="dt">&quot;acceptedFormats&quot;</span><span class="fu">:</span> <span class="ot">[</span><span class="st">&quot;json&quot;</span><span class="ot">,</span> <span class="st">&quot;yaml&quot;</span><span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-4">    <span class="dt">&quot;templates&quot;</span><span class="fu">:</span> <span class="ot">[</span><span class="st">&quot;crud&quot;</span><span class="ot">,</span> <span class="st">&quot;auth&quot;</span><span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-5">    <span class="dt">&quot;languages&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-6">        <span class="fu">{"{"}</span></span>
<span id="cb1-7">            <span class="dt">&quot;language&quot;</span><span class="fu">:</span> <span class="st">&quot;java&quot;</span><span class="fu">,</span></span>
<span id="cb1-8">            <span class="dt">&quot;description&quot;</span><span class="fu">:</span> <span class="st">&quot;Generates the micoservice with Java 17&quot;</span><span class="fu">,</span></span>
<span id="cb1-9">            <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{}"}</span></span>
<span id="cb1-10">        <span class="fu">{"}"}</span></span>
<span id="cb1-11">    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-12">    <span class="dt">&quot;apiTypes&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-13">        <span class="fu">{"{"}</span></span>
<span id="cb1-14">            <span class="dt">&quot;apiType&quot;</span><span class="fu">:</span> <span class="st">&quot;rest&quot;</span><span class="fu">,</span></span>
<span id="cb1-15">            <span class="dt">&quot;description&quot;</span><span class="fu">:</span> <span class="st">&quot;Generates a REST API using Apache Spark and controllers for endpoints&quot;</span><span class="fu">,</span> </span>
<span id="cb1-16">            <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{}"}</span></span>
<span id="cb1-17">        <span class="fu">{"}"}</span></span>
<span id="cb1-18">    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-19">    <span class="dt">&quot;databases&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-20">        <span class="fu">{"{"}</span></span>
<span id="cb1-21">            <span class="dt">&quot;database&quot;</span><span class="fu">:</span> <span class="st">&quot;postgresql&quot;</span><span class="fu">,</span></span>
<span id="cb1-22">            <span class="dt">&quot;description&quot;</span> <span class="fu">:</span> <span class="st">&quot;Generates a PostgreSQL connections and classes capable of CRUD operations&quot;</span><span class="fu">,</span></span>
<span id="cb1-23">            <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{}"}</span></span>
<span id="cb1-24">        <span class="fu">{"}"}</span></span>
<span id="cb1-25">    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-26">    <span class="dt">&quot;dataTypes&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-27">        </span>
<span id="cb1-28">    <span class="fu">{"}"}</span></span>
<span id="cb1-29"><span class="fu">{"}"}</span></span></code></pre></div>
<p>It must provide which version of the interface it implements.</p>
<p>For <code>options</code> with a predefined possible options, there must be provided a <code>selection</code> which is an array of all the possible options.</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb2-1"><span class="er">&quot;options&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb2-2">    <span class="dt">&quot;buildTool&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb2-3">        <span class="dt">&quot;selection&quot;</span><span class="fu">:</span> <span class="ot">[</span><span class="st">&quot;maven&quot;</span><span class="ot">,</span> <span class="st">&quot;gradle&quot;</span><span class="ot">]</span></span>
<span id="cb2-4">    <span class="fu">{"}"}</span></span>
<span id="cb2-5"><span class="fu">{"}"}</span></span></code></pre></div>
<p>For <code>options</code> that require the value as an input from the user, there must be provided a <code>value</code> which references the type by linking to <code>dataTypes</code>. This reference must be the full path.</p>
<div class="sourceCode" id="cb3"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb3-1"><span class="er">&quot;options&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb3-2">    <span class="dt">&quot;port&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb3-3">        <span class="dt">&quot;value&quot;</span><span class="fu">:</span> <span class="st">&quot;dataTypes.simple.int32&quot;</span></span>
<span id="cb3-4">    <span class="fu">{"}"}</span></span>
<span id="cb3-5"><span class="fu">{"}"}</span></span></code></pre></div>
<p>Any datatype provided must be listed in the <code>dataTypes</code>. Any use of a datatype must be the full path to find it in the <code>manifest.json</code>, e.x: <code>dataTypes.simple.string</code>. Datatypes can be put in an array to specify that field as being an array of that datatype. They can be put into catagories, like seen below:</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb4-1"><span class="er">&quot;dataTypes&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb4-2">    <span class="dt">&quot;simple&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb4-3">        <span class="dt">&quot;string&quot;</span><span class="fu">:</span> <span class="fu">{"{},"}</span></span>
<span id="cb4-4">        <span class="dt">&quot;int32&quot;</span><span class="fu">:</span> <span class="fu">{"{},"}</span></span>
<span id="cb4-5">        <span class="dt">&quot;boolean&quot;</span><span class="fu">:</span> <span class="fu">{"{}"}</span></span>
<span id="cb4-6">    <span class="fu">{"},"}</span></span>
<span id="cb4-7">    <span class="dt">&quot;complex&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb4-8">        <span class="dt">&quot;myType&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb4-9">            <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb4-10">                <span class="fu">{"{"}</span></span>
<span id="cb4-11">                    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;myTypeField&quot;</span><span class="fu">,</span></span>
<span id="cb4-12">                    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;dataTypes.simple.string&quot;</span></span>
<span id="cb4-13">                <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb4-14">                <span class="fu">{"{"}</span></span>
<span id="cb4-15">                    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;myTypeArray&quot;</span><span class="fu">,</span></span>
<span id="cb4-16">                    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="ot">[</span><span class="st">&quot;dataTypes.simple.string&quot;</span><span class="ot">]</span></span>
<span id="cb4-17">                <span class="fu">{"}"}</span></span>
<span id="cb4-18">            <span class="ot">]</span></span>
<span id="cb4-19">        <span class="fu">{"}"}</span></span>
<span id="cb4-20">    <span class="fu">{"}"}</span></span>
<span id="cb4-21"><span class="fu">{"}"}</span></span></code></pre></div>

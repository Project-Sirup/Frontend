<h1 id="json">JSON</h1>
<ul>
<li><a href="#getting-started">Getting Started</a></li>
<li><a href="#language-config">Language Config</a></li>
<li><a href="#database-config">Database Config</a></li>
<li><a href="#api-config">API Config</a></li>
<li><a href="#external-config">External Config</a></li>
<li><a href="#templates">Templates</a></li>
</ul>
<h2 id="getting-started">Getting Started</h2>
<p>Lets try making a simple micro service written in Java, that will have CRUD functionality. It will use MongoDB as its database and have a collection called “user”. We define endpoints for the API and link them to the collection.</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb1-1"><span class="fu">{"{"}</span></span>
<span id="cb1-2">    <span class="dt">&quot;sirup_v&quot;</span><span class="fu">:</span> <span class="dv">1</span><span class="fu">,</span></span>
<span id="cb1-3">    <span class="dt">&quot;docker&quot;</span><span class="fu">:</span> <span class="kw">true</span><span class="fu">,</span></span>
<span id="cb1-4">    <span class="dt">&quot;microservice&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-5">        <span class="dt">&quot;microserviceId&quot;</span><span class="fu">:</span> <span class="st">&quot;&lt;uuid&gt;&quot;</span><span class="fu">,</span></span>
<span id="cb1-6">        <span class="dt">&quot;microserviceName&quot;</span><span class="fu">:</span> <span class="st">&quot;MyUserService&quot;</span><span class="fu">,</span></span>
<span id="cb1-7">        <span class="dt">&quot;language&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-8">            <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;java&quot;</span><span class="fu">,</span></span>
<span id="cb1-9">            <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-10">                <span class="dt">&quot;buildTool&quot;</span><span class="fu">:</span> <span class="st">&quot;maven&quot;</span><span class="fu">,</span></span>
<span id="cb1-11">                <span class="dt">&quot;packageName&quot;</span><span class="fu">:</span> <span class="st">&quot;org.example&quot;</span></span>
<span id="cb1-12">            <span class="fu">{"}"}</span></span>
<span id="cb1-13">        <span class="fu">{"},"}</span></span>
<span id="cb1-14">        <span class="dt">&quot;database&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-15">            <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;postgresql&quot;</span><span class="fu">,</span></span>
<span id="cb1-16">            <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-17">            <span class="fu">{"},"}</span></span>
<span id="cb1-18">            <span class="dt">&quot;data&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-19">                <span class="dt">&quot;collections&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-20">                    <span class="fu">{"{"}</span></span>
<span id="cb1-21">                        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;user&quot;</span><span class="fu">,</span></span>
<span id="cb1-22">                        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-23">                            <span class="fu">{"{"}</span></span>
<span id="cb1-24">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userName&quot;</span><span class="fu">,</span></span>
<span id="cb1-25">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb1-26">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-27">                            <span class="fu">{"{"}</span></span>
<span id="cb1-28">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb1-29">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb1-30">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-31">                            <span class="fu">{"{"}</span></span>
<span id="cb1-32">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;password&quot;</span><span class="fu">,</span></span>
<span id="cb1-33">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb1-34">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-35">                            <span class="fu">{"{"}</span></span>
<span id="cb1-36">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;age&quot;</span><span class="fu">,</span></span>
<span id="cb1-37">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;int32&quot;</span></span>
<span id="cb1-38">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-39">                            <span class="fu">{"{"}</span></span>
<span id="cb1-40">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;verified&quot;</span><span class="fu">,</span></span>
<span id="cb1-41">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;boolean&quot;</span></span>
<span id="cb1-42">                            <span class="fu">{"}"}</span></span>
<span id="cb1-43">                        <span class="ot">]</span></span>
<span id="cb1-44">                    <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-45">                    <span class="fu">{"{"}</span></span>
<span id="cb1-46">                        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;task&quot;</span><span class="fu">,</span></span>
<span id="cb1-47">                        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-48">                            <span class="fu">{"{"}</span></span>
<span id="cb1-49">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;taskName&quot;</span><span class="fu">,</span></span>
<span id="cb1-50">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb1-51">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-52">                            <span class="fu">{"{"}</span></span>
<span id="cb1-53">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;taskId&quot;</span><span class="fu">,</span></span>
<span id="cb1-54">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb1-55">                            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-56">                            <span class="fu">{"{"}</span></span>
<span id="cb1-57">                                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb1-58">                                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span><span class="fu">,</span></span>
<span id="cb1-59">                                <span class="dt">&quot;ref&quot;</span><span class="fu">:</span> <span class="st">&quot;user.userId&quot;</span></span>
<span id="cb1-60">                            <span class="fu">{"}"}</span></span>
<span id="cb1-61">                        <span class="ot">]</span></span>
<span id="cb1-62">                    <span class="fu">{"}"}</span></span>
<span id="cb1-63">                <span class="ot">]</span></span>
<span id="cb1-64">            <span class="fu">{"}"}</span></span>
<span id="cb1-65">        <span class="fu">{"},"}</span></span>
<span id="cb1-66">        <span class="dt">&quot;api&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb1-67">            <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;rest&quot;</span><span class="fu">,</span></span>
<span id="cb1-68">            <span class="dt">&quot;endpointGroups&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-69">                <span class="fu">{"{"}</span></span>
<span id="cb1-70">                    <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/api&quot;</span><span class="fu">,</span></span>
<span id="cb1-71">                    <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-72">                        <span class="fu">{"{"}</span></span>
<span id="cb1-73">                            <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/v1&quot;</span><span class="fu">,</span></span>
<span id="cb1-74">                            <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-75">                                <span class="fu">{"{"}</span></span>
<span id="cb1-76">                                    <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/user&quot;</span><span class="fu">,</span></span>
<span id="cb1-77">                                    <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb1-78">                                    <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-79">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-80">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb1-81">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-82">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;find&quot;</span></span>
<span id="cb1-83">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-84">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-85">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb1-86">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/:userId&quot;</span><span class="fu">,</span></span>
<span id="cb1-87">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;findAll&quot;</span></span>
<span id="cb1-88">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-89">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-90">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;post&quot;</span><span class="fu">,</span></span>
<span id="cb1-91">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-92">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;create&quot;</span></span>
<span id="cb1-93">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-94">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-95">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;put&quot;</span><span class="fu">,</span></span>
<span id="cb1-96">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-97">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;update&quot;</span></span>
<span id="cb1-98">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-99">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-100">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;delete&quot;</span><span class="fu">,</span></span>
<span id="cb1-101">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/:userId&quot;</span><span class="fu">,</span></span>
<span id="cb1-102">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;remove&quot;</span></span>
<span id="cb1-103">                                        <span class="fu">{"}"}</span></span>
<span id="cb1-104">                                    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-105">                                    <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="st">&quot;user&quot;</span></span>
<span id="cb1-106">                                <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-107">                                <span class="fu">{"{"}</span></span>
<span id="cb1-108">                                    <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/task&quot;</span><span class="fu">,</span></span>
<span id="cb1-109">                                    <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb1-110">                                    <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb1-111">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-112">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb1-113">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-114">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;find&quot;</span></span>
<span id="cb1-115">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-116">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-117">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb1-118">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/:taskId&quot;</span><span class="fu">,</span></span>
<span id="cb1-119">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;findAll&quot;</span></span>
<span id="cb1-120">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-121">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-122">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;post&quot;</span><span class="fu">,</span></span>
<span id="cb1-123">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-124">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;create&quot;</span></span>
<span id="cb1-125">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-126">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-127">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;put&quot;</span><span class="fu">,</span></span>
<span id="cb1-128">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb1-129">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;update&quot;</span></span>
<span id="cb1-130">                                        <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb1-131">                                        <span class="fu">{"{"}</span></span>
<span id="cb1-132">                                            <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;delete&quot;</span><span class="fu">,</span></span>
<span id="cb1-133">                                            <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/:taskId&quot;</span><span class="fu">,</span></span>
<span id="cb1-134">                                            <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;remove&quot;</span></span>
<span id="cb1-135">                                        <span class="fu">{"}"}</span></span>
<span id="cb1-136">                                    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-137">                                    <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="st">&quot;task&quot;</span></span>
<span id="cb1-138">                                <span class="fu">{"}"}</span></span>
<span id="cb1-139">                            <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-140">                            <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb1-141">                            <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="kw">null</span></span>
<span id="cb1-142">                        <span class="fu">{"}"}</span></span>
<span id="cb1-143">                    <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-144">                    <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb1-145">                    <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="kw">null</span></span>
<span id="cb1-146">                <span class="fu">{"}"}</span></span>
<span id="cb1-147">            <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb1-148">            <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[]</span></span>
<span id="cb1-149">        <span class="fu">{"},"}</span></span>
<span id="cb1-150">        <span class="dt">&quot;external&quot;</span><span class="fu">:</span> <span class="ot">[]</span></span>
<span id="cb1-151">    <span class="fu">{"}"}</span></span>
<span id="cb1-152"><span class="fu">{"}"}</span></span></code></pre></div>
<h2 id="language-config">Language Config</h2>
<p>Language configuration is done in <code>microservice.language</code>.</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb2-1"><span class="er">&quot;language&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb2-2">    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;java&quot;</span><span class="fu">,</span></span>
<span id="cb2-3">    <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb2-4">        <span class="dt">&quot;buildTool&quot;</span><span class="fu">:</span> <span class="st">&quot;maven&quot;</span><span class="fu">,</span></span>
<span id="cb2-5">        <span class="dt">&quot;packageName&quot;</span><span class="fu">:</span> <span class="st">&quot;org.example&quot;</span></span>
<span id="cb2-6">    <span class="fu">{"}"}</span></span>
<span id="cb2-7"><span class="fu">{"}"}</span></span></code></pre></div>
<p>Any additional configuration needed for a given language must be placed in the <code>microservice.language.options</code> object.</p>
<h2 id="database-config">Database Config</h2>
<p>Database configuration is done in <code>microservice.database</code></p>
<div class="sourceCode" id="cb3"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb3-1"><span class="er">&quot;database&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb3-2">    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;postgresql&quot;</span><span class="fu">,</span></span>
<span id="cb3-3">    <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb3-4">    <span class="fu">{"},"}</span></span>
<span id="cb3-5">    <span class="dt">&quot;data&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb3-6">        <span class="dt">&quot;collections&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb3-7">        <span class="ot">]</span></span>
<span id="cb3-8">    <span class="fu">{"}"}</span></span>
<span id="cb3-9"><span class="fu">{"}"}</span></span></code></pre></div>
<h3 id="collections">Collections</h3>
<p>Specify what data the database should store.</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb4-1"><span class="er">&quot;collections&quot;:</span> <span class="ot">[</span></span>
<span id="cb4-2">    <span class="fu">{"{"}</span></span>
<span id="cb4-3">        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;user&quot;</span><span class="fu">,</span></span>
<span id="cb4-4">        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb4-5">            <span class="fu">{"{"}</span></span>
<span id="cb4-6">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb4-7">                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb4-8">            <span class="fu">{"}"}</span></span>
<span id="cb4-9">        <span class="ot">]</span></span>
<span id="cb4-10">    <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb4-11">    <span class="fu">{"{"}</span></span>
<span id="cb4-12">        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;task&quot;</span><span class="fu">,</span></span>
<span id="cb4-13">        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb4-14">            <span class="fu">{"{"}</span></span>
<span id="cb4-15">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;taskId&quot;</span><span class="fu">,</span></span>
<span id="cb4-16">                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span><span class="fu">,</span></span>
<span id="cb4-17">            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb4-18">            <span class="fu">{"{"}</span></span>
<span id="cb4-19">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb4-20">                <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span><span class="fu">,</span></span>
<span id="cb4-21">                <span class="dt">&quot;ref&quot;</span><span class="fu">:</span> <span class="st">&quot;user.userId&quot;</span></span>
<span id="cb4-22">            <span class="fu">{"}"}</span></span>
<span id="cb4-23">        <span class="ot">]</span></span>
<span id="cb4-24">    <span class="fu">{"}"}</span></span>
<span id="cb4-25"><span class="ot">]</span></span></code></pre></div>
<p>The available types are will be provided by the individual GenerationService, in its <code>manifest.json</code></p>
<p>The identifier for any collection must be provided as the first field. The <code>ref</code> can be supplied for relational data.</p>
<h2 id="api-config">API Config</h2>
<p>The API configuration is done in <code>microservice.api</code>.</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb5-1"><span class="er">&quot;api&quot;:</span> <span class="fu">{"{"}</span></span>
<span id="cb5-2">    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;rest&quot;</span><span class="fu">,</span></span>
<span id="cb5-3">    <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb5-4">    <span class="fu">{"}"}</span></span>
<span id="cb5-5"><span class="fu">{"}"}</span></span></code></pre></div>
<p>Additional configuration of the API is done in the <code>microservice.api.options</code>. The available options to configure is provided be the individual GenerationService, in its <code>manifest.json</code></p>
<h3 id="rest-example">REST Example</h3>
<h4 id="endpoints">Endpoints</h4>
<p>Endpoints can either be declared individually or in groups. Groups are recursive and can therefore be nested.</p>
<div class="sourceCode" id="cb6"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb6-1"><span class="er">&quot;endpointGroups&quot;:</span> <span class="ot">[</span></span>
<span id="cb6-2">    <span class="fu">{"{"}</span></span>
<span id="cb6-3">        <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/api&quot;</span><span class="fu">,</span></span>
<span id="cb6-4">        <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb6-5">            <span class="fu">{"{"}</span></span>
<span id="cb6-6">                <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/v1&quot;</span><span class="fu">,</span></span>
<span id="cb6-7">                <span class="dt">&quot;innerGroups&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb6-8">                <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb6-9">                    <span class="fu">{"{"}</span></span>
<span id="cb6-10">                        <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb6-11">                        <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb6-12">                    <span class="fu">{"}"}</span></span>
<span id="cb6-13">                <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb6-14">                <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="kw">null</span></span>
<span id="cb6-15">            <span class="fu">{"}"}</span></span>
<span id="cb6-16">        <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb6-17">        <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[]</span></span>
<span id="cb6-18">    <span class="fu">{"}"}</span></span>
<span id="cb6-19"><span class="ot">]</span></span></code></pre></div>
<p>Endpoints that require more complicated implementation, should be declared alone.Endpoints can be linked to a controller by having them grouped:</p>
<div class="sourceCode" id="cb7"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb7-1"><span class="er">&quot;endpointGroups&quot;:</span> <span class="ot">[</span></span>
<span id="cb7-2">    <span class="fu">{"{"}</span></span>
<span id="cb7-3">        <span class="dt">&quot;groupName&quot;</span><span class="fu">:</span> <span class="st">&quot;/api/v1/user&quot;</span><span class="fu">,</span></span>
<span id="cb7-4">        <span class="dt">&quot;innerGroup&quot;</span><span class="fu">:</span> <span class="ot">[]</span><span class="fu">,</span></span>
<span id="cb7-5">        <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb7-6">            <span class="fu">{"{"}</span></span>
<span id="cb7-7">                <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;get&quot;</span><span class="fu">,</span></span>
<span id="cb7-8">                <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/:userId&quot;</span><span class="fu">,</span></span>
<span id="cb7-9">                <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;find&quot;</span></span>
<span id="cb7-10">            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb7-11">            <span class="fu">{"{"}</span></span>
<span id="cb7-12">                <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;post&quot;</span><span class="fu">,</span></span>
<span id="cb7-13">                <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span><span class="fu">,</span></span>
<span id="cb7-14">                <span class="dt">&quot;linkedMethod&quot;</span><span class="fu">:</span> <span class="st">&quot;create&quot;</span></span>
<span id="cb7-15">            <span class="fu">{"}"}</span></span>
<span id="cb7-16">        <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb7-17">        <span class="dt">&quot;linkedData&quot;</span><span class="fu">:</span> <span class="st">&quot;user&quot;</span></span>
<span id="cb7-18">    <span class="fu">{"}"}</span></span>
<span id="cb7-19"><span class="ot">]</span></span></code></pre></div>
<p>The <code>linkedData</code> must also be declared in the <code>microservice.database.data.collections</code>.</p>
<h3 id="grpc-example">gRPC Example</h3>
<h4 id="procedures">Procedures</h4>
<p>The procedures link to their request and response message</p>
<div class="sourceCode" id="cb8"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb8-1"><span class="er">&quot;procedures&quot;:</span> <span class="ot">[</span></span>
<span id="cb8-2">    <span class="fu">{"{"}</span></span>
<span id="cb8-3">        <span class="dt">&quot;procedureName&quot;</span><span class="fu">:</span> <span class="st">&quot;authToken&quot;</span><span class="fu">,</span></span>
<span id="cb8-4">        <span class="dt">&quot;requestMessage&quot;</span><span class="fu">:</span> <span class="st">&quot;authRequest&quot;</span><span class="fu">,</span></span>
<span id="cb8-5">        <span class="dt">&quot;responseMessage&quot;</span><span class="fu">:</span> <span class="st">&quot;authResponse&quot;</span></span>
<span id="cb8-6">    <span class="fu">{"}"}</span></span>
<span id="cb8-7"><span class="ot">]</span><span class="er">,</span></span></code></pre></div>
<h4 id="messages">Messages</h4>
<p>Messages can contain other messages</p>
<div class="sourceCode" id="cb9"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb9-1"><span class="er">&quot;messages&quot;:</span> <span class="ot">[</span></span>
<span id="cb9-2">    <span class="fu">{"{"}</span></span>
<span id="cb9-3">        <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span><span class="fu">,</span></span>
<span id="cb9-4">        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb9-5">            <span class="fu">{"{"}</span></span>
<span id="cb9-6">                <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb9-7">                <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb9-8">            <span class="fu">{"}"}</span></span>
<span id="cb9-9">        <span class="ot">]</span></span>
<span id="cb9-10">    <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb9-11">    <span class="fu">{"{"}</span></span>
<span id="cb9-12">        <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;authRequest&quot;</span><span class="fu">,</span></span>
<span id="cb9-13">        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb9-14">            <span class="fu">{"{"}</span></span>
<span id="cb9-15">                <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;token&quot;</span><span class="fu">,</span></span>
<span id="cb9-16">                <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb9-17">            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb9-18">            <span class="fu">{"{"}</span></span>
<span id="cb9-19">                <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span><span class="fu">,</span></span>
<span id="cb9-20">                <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span></span>
<span id="cb9-21">            <span class="fu">{"}"}</span></span>
<span id="cb9-22">        <span class="ot">]</span></span>
<span id="cb9-23">    <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb9-24">    <span class="fu">{"{"}</span></span>
<span id="cb9-25">        <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;authResponse&quot;</span><span class="fu">,</span></span>
<span id="cb9-26">        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb9-27">            <span class="fu">{"{"}</span></span>
<span id="cb9-28">                <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;valid&quot;</span><span class="fu">,</span></span>
<span id="cb9-29">                <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;boolean&quot;</span></span>
<span id="cb9-30">            <span class="fu">{"}"}</span></span>
<span id="cb9-31">        <span class="ot">]</span></span>
<span id="cb9-32">    <span class="fu">{"}"}</span></span>
<span id="cb9-33"><span class="ot">]</span></span></code></pre></div>
<h2 id="external-config">External Config</h2>
<p>The external config will need information about the other microservices that it will communicate with, so the generated code can add any necessary dependencies. This configuration should be done automatically by the design tool when connecting two microservices.</p>
<div class="sourceCode" id="cb10"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb10-1"><span class="er">&quot;external&quot;:</span> <span class="ot">[]</span></span></code></pre></div>
<h3 id="rest-example-1">REST Example</h3>
<div class="sourceCode" id="cb11"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb11-1"><span class="fu">{"{"}</span></span>
<span id="cb11-2">    <span class="dt">&quot;microserviceId&quot;</span><span class="fu">:</span> <span class="st">&quot;&lt;UUID&gt;&quot;</span><span class="fu">,</span></span>
<span id="cb11-3">    <span class="dt">&quot;microserviceName&quot;</span><span class="fu">:</span> <span class="st">&quot;MyOtherService&quot;</span><span class="fu">,</span></span>
<span id="cb11-4">    <span class="dt">&quot;connection&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb11-5">        <span class="dt">&quot;api&quot;</span><span class="fu">:</span> <span class="st">&quot;REST&quot;</span><span class="fu">,</span></span>
<span id="cb11-6">        <span class="dt">&quot;port&quot;</span><span class="fu">:</span> <span class="dv">2048</span><span class="fu">,</span></span>
<span id="cb11-7">        <span class="dt">&quot;endpoints&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb11-8">            <span class="fu">{"{"}</span></span>
<span id="cb11-9">                <span class="dt">&quot;method&quot;</span><span class="fu">:</span> <span class="st">&quot;GET&quot;</span><span class="fu">,</span></span>
<span id="cb11-10">                <span class="dt">&quot;path&quot;</span><span class="fu">:</span> <span class="st">&quot;/api/v1/user&quot;</span></span>
<span id="cb11-11">            <span class="fu">{"}"}</span></span>
<span id="cb11-12">        <span class="ot">]</span></span>
<span id="cb11-13">    <span class="fu">{"}"}</span> </span>
<span id="cb11-14"><span class="fu">{"}"}</span></span></code></pre></div>
<p>The path for any endpoint must the the full path from root.</p>
<h3 id="grpc-example-1">gRPC Example</h3>
<div class="sourceCode" id="cb12"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb12-1"><span class="fu">{"{"}</span></span>
<span id="cb12-2">    <span class="dt">&quot;microserviceId&quot;</span><span class="fu">:</span> <span class="st">&quot;&lt;UUID&gt;&quot;</span><span class="fu">,</span></span>
<span id="cb12-3">    <span class="dt">&quot;microserviceName&quot;</span><span class="fu">:</span> <span class="st">&quot;MyOtherService&quot;</span><span class="fu">,</span></span>
<span id="cb12-4">    <span class="dt">&quot;connection&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb12-5">        <span class="dt">&quot;api&quot;</span><span class="fu">:</span> <span class="st">&quot;gRPC&quot;</span><span class="fu">,</span></span>
<span id="cb12-6">        <span class="dt">&quot;port&quot;</span><span class="fu">:</span> <span class="dv">1024</span><span class="fu">,</span></span>
<span id="cb12-7">        <span class="dt">&quot;procedures&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb12-8">            <span class="fu">{"{"}</span></span>
<span id="cb12-9">                <span class="dt">&quot;procedureName&quot;</span><span class="fu">:</span> <span class="st">&quot;authToken&quot;</span><span class="fu">,</span></span>
<span id="cb12-10">                <span class="dt">&quot;requestMessage&quot;</span><span class="fu">:</span> <span class="st">&quot;authRequest&quot;</span><span class="fu">,</span></span>
<span id="cb12-11">                <span class="dt">&quot;responseMessage&quot;</span><span class="fu">:</span> <span class="st">&quot;authResponse&quot;</span></span>
<span id="cb12-12">            <span class="fu">{"}"}</span></span>
<span id="cb12-13">        <span class="ot">]</span><span class="fu">,</span></span>
<span id="cb12-14">        <span class="dt">&quot;messages&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb12-15">            <span class="fu">{"{"}</span></span>
<span id="cb12-16">                <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span><span class="fu">,</span></span>
<span id="cb12-17">                <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb12-18">                    <span class="fu">{"{"}</span></span>
<span id="cb12-19">                        <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb12-20">                        <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb12-21">                    <span class="fu">{"}"}</span></span>
<span id="cb12-22">                <span class="ot">]</span></span>
<span id="cb12-23">            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb12-24">            <span class="fu">{"{"}</span></span>
<span id="cb12-25">                <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;authRequest&quot;</span><span class="fu">,</span></span>
<span id="cb12-26">                <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb12-27">                    <span class="fu">{"{"}</span></span>
<span id="cb12-28">                        <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;token&quot;</span><span class="fu">,</span></span>
<span id="cb12-29">                        <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb12-30">                    <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb12-31">                    <span class="fu">{"{"}</span></span>
<span id="cb12-32">                        <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span><span class="fu">,</span></span>
<span id="cb12-33">                        <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;credentials&quot;</span></span>
<span id="cb12-34">                    <span class="fu">{"}"}</span></span>
<span id="cb12-35">                <span class="ot">]</span></span>
<span id="cb12-36">            <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb12-37">            <span class="fu">{"{"}</span></span>
<span id="cb12-38">                <span class="dt">&quot;messageName&quot;</span><span class="fu">:</span> <span class="st">&quot;authResponse&quot;</span><span class="fu">,</span></span>
<span id="cb12-39">                <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb12-40">                    <span class="fu">{"{"}</span></span>
<span id="cb12-41">                        <span class="dt">&quot;fieldName&quot;</span><span class="fu">:</span> <span class="st">&quot;valid&quot;</span><span class="fu">,</span></span>
<span id="cb12-42">                        <span class="dt">&quot;fieldType&quot;</span><span class="fu">:</span> <span class="st">&quot;boolean&quot;</span></span>
<span id="cb12-43">                    <span class="fu">{"}"}</span></span>
<span id="cb12-44">                <span class="ot">]</span></span>
<span id="cb12-45">            <span class="fu">{"}"}</span></span>
<span id="cb12-46">        <span class="ot">]</span></span>
<span id="cb12-47">    <span class="fu">{"}"}</span> </span>
<span id="cb12-48"><span class="fu">{"}"}</span></span></code></pre></div>
<p>For this example we do need a lot more information as we need to generate the proto file and the client side code for the gRPC API.</p>
<h2 id="templates">Templates</h2>
<h3 id="crud">CRUD</h3>
<p>For a quick way to make a service with CRUD functionality. It will generate a controller can API endpoints to perform CRUD operations for every element provided in the <code>microservice.database.data.collections</code>. The example below will generate a <code>UserController</code>, with the methods: <code>getUser</code>, <code>getAllUser</code>, <code>addUser</code>, <code>updateUser</code>, and <code>removeUser</code>; and an endpoint for each.</p>
<div class="sourceCode" id="cb13"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb13-1"><span class="fu">{"{"}</span></span>
<span id="cb13-2">    <span class="dt">&quot;sirup_v&quot;</span><span class="fu">:</span> <span class="dv">1</span><span class="fu">,</span></span>
<span id="cb13-3">    <span class="dt">&quot;template&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb13-4">        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;crud&quot;</span><span class="fu">,</span></span>
<span id="cb13-5">        <span class="dt">&quot;api&quot;</span><span class="fu">:</span> <span class="st">&quot;rest&quot;</span><span class="fu">,</span></span>
<span id="cb13-6">        <span class="dt">&quot;service&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb13-7">            <span class="dt">&quot;service_id&quot;</span><span class="fu">:</span> <span class="st">&quot;&lt;uuid&gt;&quot;</span><span class="fu">,</span></span>
<span id="cb13-8">            <span class="dt">&quot;service_name&quot;</span><span class="fu">:</span> <span class="st">&quot;MyUserService&quot;</span><span class="fu">,</span></span>
<span id="cb13-9">            <span class="dt">&quot;language&quot;</span> <span class="er">{"{"}</span></span>
<span id="cb13-10">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;java&quot;</span><span class="fu">,</span></span>
<span id="cb13-11">                <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb13-12">                    <span class="dt">&quot;buildTool&quot;</span><span class="fu">:</span> <span class="st">&quot;maven&quot;</span><span class="fu">,</span></span>
<span id="cb13-13">                    <span class="dt">&quot;packageName&quot;</span><span class="fu">:</span> <span class="st">&quot;org.exmaple&quot;</span></span>
<span id="cb13-14">                <span class="fu">{"}"}</span></span>
<span id="cb13-15">            <span class="fu">{"},"}</span></span>
<span id="cb13-16">            <span class="dt">&quot;database&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb13-17">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;mongodb&quot;</span><span class="fu">,</span></span>
<span id="cb13-18">                <span class="dt">&quot;data&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb13-19">                    <span class="dt">&quot;collections&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb13-20">                        <span class="fu">{"{"}</span></span>
<span id="cb13-21">                            <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;user&quot;</span><span class="fu">,</span></span>
<span id="cb13-22">                            <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb13-23">                                <span class="fu">{"{"}</span></span>
<span id="cb13-24">                                    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;userId&quot;</span><span class="fu">,</span></span>
<span id="cb13-25">                                    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb13-26">                                <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb13-27">                                <span class="fu">{"{"}</span></span>
<span id="cb13-28">                                    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;uesrName&quot;</span><span class="fu">,</span></span>
<span id="cb13-29">                                    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb13-30">                                <span class="fu">{"}"}</span><span class="ot">,</span></span>
<span id="cb13-31">                                <span class="fu">{"{"}</span></span>
<span id="cb13-32">                                    <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;password&quot;</span><span class="fu">,</span></span>
<span id="cb13-33">                                    <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span></span>
<span id="cb13-34">                                <span class="fu">{"}"}</span></span>
<span id="cb13-35">                            <span class="ot">]</span></span>
<span id="cb13-36">                        <span class="fu">{"}"}</span></span>
<span id="cb13-37">                    <span class="ot">]</span></span>
<span id="cb13-38">                <span class="fu">{"}"}</span></span>
<span id="cb13-39">            <span class="fu">{"}"}</span></span>
<span id="cb13-40">        <span class="fu">{"}"}</span></span>
<span id="cb13-41">    <span class="fu">{"}"}</span></span>
<span id="cb13-42"><span class="er">{"}"}</span></span></code></pre></div>
<h3 id="auth">AUTH</h3>
<p>For a quick way of making an AuthenticationService, that can generate and authenticate tokens, it is possible to user the <code>auth</code> template.</p>
<div class="sourceCode" id="cb14"><pre class="sourceCode json"><code class="sourceCode json"><span id="cb14-1"><span class="fu">{"{"}</span></span>
<span id="cb14-2">    <span class="dt">&quot;sirup_v&quot;</span><span class="fu">:</span> <span class="dv">1</span><span class="fu">,</span></span>
<span id="cb14-3">    <span class="dt">&quot;template&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb14-4">        <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;auth&quot;</span><span class="fu">,</span></span>
<span id="cb14-5">        <span class="dt">&quot;api&quot;</span><span class="fu">:</span> <span class="st">&quot;grpc&quot;</span><span class="fu">,</span></span>
<span id="cb14-6">        <span class="dt">&quot;service&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb14-7">            <span class="dt">&quot;service_id&quot;</span><span class="fu">:</span> <span class="st">&quot;&lt;uuid&gt;&quot;</span><span class="fu">,</span></span>
<span id="cb14-8">            <span class="dt">&quot;service_name&quot;</span><span class="fu">:</span> <span class="st">&quot;MyAuthService&quot;</span><span class="fu">,</span></span>
<span id="cb14-9">            <span class="dt">&quot;language&quot;</span> <span class="er">{"{"}</span></span>
<span id="cb14-10">                <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;java&quot;</span><span class="fu">,</span></span>
<span id="cb14-11">                <span class="dt">&quot;options&quot;</span><span class="fu">:</span> <span class="fu">{"{"}</span></span>
<span id="cb14-12">                    <span class="dt">&quot;buildTool&quot;</span><span class="fu">:</span> <span class="st">&quot;maven&quot;</span><span class="fu">,</span></span>
<span id="cb14-13">                    <span class="dt">&quot;packageName&quot;</span><span class="fu">:</span> <span class="st">&quot;org.example&quot;</span></span>
<span id="cb14-14">                <span class="fu">{"}"}</span></span>
<span id="cb14-15">            <span class="fu">{"}"}</span></span>
<span id="cb14-16">        <span class="fu">{"}"}</span></span>
<span id="cb14-17">    <span class="fu">{"}"}</span></span>
<span id="cb14-18"><span class="er">{"}"}</span></span></code></pre></div>

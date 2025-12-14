

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>algorithmic-art</name>
<description>Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.</description>
<location>global</location>
</skill>
<!-- 使用 p5.js 創建演算法藝術，並帶有種子隨機性和互動式參數探索功能。當使用者要求使用程式碼、生成藝術、演算法藝術、流場或粒子系統創建藝術作品時，請使用此技能。創作原創演算法藝術，而非抄襲現有藝術家的作品，以避免侵害著作權。 -->
<skill>
<name>brand-guidelines</name>
<description>Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.</description>
<location>global</location>
</skill>
<!-- 將 Anthropic 的官方品牌顏色和字體應用於任何可能受益於 Anthropic 外觀和風格的物品。當需要品牌顏色或風格指南、視覺格式或公司設計標準時，請使用此技能。 -->
<skill>
<name>canvas-design</name>
<description>Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.</description>
<location>global</location>
</skill>
<!-- 運用設計概念，在 .png 和 .pdf 文件中創造精美的視覺藝術作品。當使用者要求創建海報、藝術作品、設計或其他靜態作品時，您應該使用此技能。創作原創視覺設計，絕不抄襲現有藝術家的作品，以避免侵害著作權。 -->
<skill>
<name>doc-coauthoring</name>
<description>Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.</description>
<location>global</location>
</skill>
<!-- 引導使用者完成文件協作的結構化工作流程。適用於使用者撰寫文件、提案、技術規格、決策文件或類似結構化內容的情況。此工作流程可協助使用者有效率地傳遞上下文資訊、透過迭代完善內容，並驗證文件是否符合讀者需求。 當使用者提及撰寫文件、建立提案、起草規格或類似文件任務時觸發。 -->
<skill>
<name>docx</name>
<description>"Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks"</description>
<location>global</location>
</skill>
<!-- 全面建立、編輯和分析文檔，支援追蹤更改、註釋、格式保留和文字提取。當 Claude 需要處理專業文檔（.docx 文件）時，可以執行以下操作：(1) 建立新文檔，(2) 修改或編輯內容，(3) 使用追蹤更改，(4) 新增註釋，或執行任何其他文檔任務。 -->
<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>global</location>
</skill>
<!-- 創造具有獨特性、生產級且設計品質高的前端介面。 當使用者要求建立 Web 元件、頁面、作品、海報或應用程式（例如網站、落地頁、儀表板、React 元件、HTML/CSS 佈局，或對任何 Web UI 進行樣式美化），可以使用此技能。它能產生創意、精良的程式碼和 UI 設計，避免千篇一律的 AI 美學風格。 -->
<skill>
<name>internal-comms</name>
<description>A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).</description>
<location>global</location>
</skill>
<!-- 一套資源幫助我使用公司常用的格式撰寫各種內部溝通資料。 在需要撰寫任何類型的內部溝通資料（狀態報告、領導層更新、第三方更新、公司簡報、常見問題、事件報告、專案更新等）時，都應該運用這項技能。 -->
<skill>
<name>mcp-builder</name>
<description>Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).</description>
<location>global</location>
</skill>
<!-- 建立高品質 MCP（模型上下文協定）伺服器的指南，使 LLM 能夠透過精心設計的工具與外部服務互動。在建立 MCP 伺服器以整合外部 API 或服務時使用，無論是在 Python (FastMCP) 或 Node/TypeScript (MCP SDK) 中。 -->
<skill>
<name>pdf</name>
<description>Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale.</description>
<location>global</location>
</skill>
<!-- 功能全面的 PDF 處理工具包，用於提取文字和表格、建立新的 PDF、合併/分割文件以及處理表單。 當 Claude 需要填寫 PDF 表單或以程式設計方式大規模處理、產生或分析 PDF 文件。 -->
<skill>
<name>pptx</name>
<description>"Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks"</description>
<location>global</location>
</skill>
<!-- 簡報的建立、編輯和分析。當 Claude 需要處理簡報（.pptx 檔案）以進行以下操作：(1) 建立新簡報，(2) 修改或編輯內容，(3) 處理佈局，(4) 新增註釋或演講者備註，或任何其他簡報任務 -->
<skill>
<name>skill-creator</name>
<description>Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.</description>
<location>global</location>
</skill>
<!-- 建立高效技能的指南。當使用者想要創建新技能（或更新現有技能），以透過專業知識、工作流程或工具整合來擴展 Claude 的功能時，應使用此技能。 -->
<skill>
<name>slack-gif-creator</name>
<description>Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack."</description>
<location>global</location>
</skill>
<!-- 用於創建針對 Slack 最佳化的動畫 GIF 的知識和實用工具。提供約束、驗證工具和動畫概念。 當使用者要求 Slack 動畫 GIF 時使用，例如「幫我製作一個 X 做 Y 的 Slack GIF」。 -->
<skill>
<name>template</name>
<description>Replace with description of the skill and when Claude should use it.</description>
<location>global</location>
</skill>
<!-- 替換為技能描述以及 Claude 何時應該使用它。 -->
<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>global</location>
</skill>
<!-- 用於使用主體設定元素樣式的工具包。 這些工件可以是投影片、文件、報告、HTML 落地頁等等。有 10 個預設主題，包含顏色和字體，您可以將其套用於任何已建立的工件，也可以即時產生新主題。 -->
<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>global</location>
</skill>
<!-- 一套用於使用現代前端 Web 技術（React、Tailwind CSS、shadcn/ui）創建複雜的多組件 claude.ai HTML 工件的工具。適用於需要狀態管理、路由或 shadcn/ui 元件的複雜工件，不適用於簡單的單一檔案 HTML/JSX 工件。 -->
<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>global</location>
</skill>
<!-- 用於使用 Playwright 與本機 Web 應用程式互動和測試的工具包。 支援驗證前端功能、偵錯 UI 行為、擷取瀏覽器螢幕截圖和檢視瀏覽器日誌。 -->
<skill>
<name>xlsx</name>
<description>"Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. When Claude needs to work with spreadsheets (.xlsx, .xlsm, .csv, .tsv, etc) for: (1) Creating new spreadsheets with formulas and formatting, (2) Reading or analyzing data, (3) Modify existing spreadsheets while preserving formulas, (4) Data analysis and visualization in spreadsheets, or (5) Recalculating formulas"</description>
<location>global</location>
</skill>
<!-- 全面建立、編輯和分析電子表格，支援公式、格式設定、資料分析和視覺化。當 Claude 需要使用電子表格（.xlsx、.xlsm、.csv、.tsv 等）進行以下操作：(1) 建立具有公式和格式的新電子表格；(2) 讀取或分析資料；(3) 修改資料表和現有公式和現有表格 (54) 在資料表中進行修改；重新計算公式。 -->
</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>

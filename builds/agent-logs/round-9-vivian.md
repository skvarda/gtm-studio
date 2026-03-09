Let me assess the current state before writing the directive.

<tool_call>
<tool_name>Glob</tool_name>
<tool_input>{"pattern": "/home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>
<tool_call>
<tool_name>Glob</tool_name>
<tool_input>{"pattern": "/home/gtm/game*.html"}</tool_input>
</tool_call>
<tool_call>
<tool_name>Glob</tool_name>
<tool_input>{"pattern": "/home/gtm/docs/**/*"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "ls -la /home/gtm/*.html /home/gtm/*.json 2>/dev/null"}</tool_input>
</tool_call>

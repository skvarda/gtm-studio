Let me review the current state of the build and prior round artifacts before writing the directive.

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>ls -la /home/gtm/saas-startup-simulator.html /home/gtm/game.html 2>/dev/null && echo "---" && ls /home/gtm/docs/ 2>/dev/null</command>
</parameters>
</tool_call>
<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/gtm/docs/*round*</pattern>
</parameters>
</tool_call>
<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/gtm/docs/*brief*</pattern>
</parameters>
</tool_call>

<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/gtm/docs/*</pattern>
</parameters>
</tool_call>

Let me assess the current state of the build before writing the directive.

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<filename>/home/gtm/saas-startup-simulator.html</filename>
<offset>0</offset>
<limit>100</limit>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>wc -l /home/gtm/saas-startup-simulator.html</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/gtm/docs/**/*</pattern>
</parameters>
</tool_call>

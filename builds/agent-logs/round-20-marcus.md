Let me check the current state of the game file first.

<tool_call>
<tool_name>Read</tool_name>
<parameter name="file_path">/home/gtm/saas-startup-simulator.html</parameter>
<parameter name="offset">0</parameter>
<parameter name="limit">100</parameter>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<parameter name="pattern">function (advanceDay|startDay|endDay|economy|burn|runway|mrr|tick)</parameter>
<parameter name="path">/home/gtm/saas-startup-simulator.html</parameter>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<parameter name="pattern">(cash|mrr|burn|runway|customers|churn)</parameter>
<parameter name="path">/home/gtm/saas-startup-simulator.html</parameter>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<parameter name="file_path">/home/gtm/docs/brief-round22.md</parameter>
</tool_call>

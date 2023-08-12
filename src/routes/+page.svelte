<script type="text/javascript">
	import Input from '$lib/components/Input.svelte'
	import MessageHistory from '$lib/components/MessageHistory.svelte'

	import { History } from '$lib/stores.js'

	const commands = [
		'/login',
		'/nick',
		'/auth',
		'/status',
		'/who'
	];

	function send(message) {
		let current = $History

		current.push({
			text: message,
			from: 'me',
			me: true,
			timestamp: new Date().getTime(),
			userColor: 'pink'
		});

		History.set(current)
	}

	History.set($History.sort((x, y) => {
		if(x.timestamp - y.timestamp < 0) return -1;
		return 0;
	}))

</script>

<div class="main">
	<MessageHistory history={$History} />
	<Input commandsAvailable={commands} onSend={send}/>
</div>

<style type="text/css">
	
	.main {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
	}
</style>

